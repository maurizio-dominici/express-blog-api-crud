const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const responseObject = { error: err.message };

  if (err.data) {
    responseObject.data = err.data;
  }

  res.status(statusCode);
  res.json(responseObject);
};

module.exports = errorHandler;
