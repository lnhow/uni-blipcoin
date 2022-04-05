const handleBadJSONParseError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json(getErrResponse(err.message));
  }
  next();
};

const getErrResponse = (message = 'Error') => {
  return {
    success: false,
    data: {},
    message: message,
  };
};

module.exports = {
  handleBadJSONParseError,
  getErrResponse,
};
