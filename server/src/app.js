const express = require('express');
const cors = require('cors');
const config = require('./config');
const ErrorHelper = require('./helpers/error');
const ErrorController = require('./controllers/error/error.controller');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ErrorHelper.handleBadJSONParseError);

const Blockchain = require('./types/blockchain');
const chain = new Blockchain();

const IndexRouter = require('./route')(chain);
app.use(`${config.server.root}`, IndexRouter);

app.use(ErrorController.handleNotFoundError);

if (config.system.testTransaction) {
  console.log('Adding transaction test data');
  require('./testTransaction')(chain);
}

module.exports = app;
