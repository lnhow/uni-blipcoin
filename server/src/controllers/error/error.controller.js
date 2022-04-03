const { getErrResponse } = require('../../helpers/error');

const handleNotFoundError = (req, res) => {
  res.status(404).json(getErrResponse('Invalid URL'));
};

module.exports = {
  handleNotFoundError,
};
