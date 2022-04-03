const handleBadJSONParseError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      data: {},
      message: err.message,
    });
  }
  next();
};

module.exports = {
  handleBadJSONParseError
}
