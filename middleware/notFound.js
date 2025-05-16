const notFound = (req, res, next) => {
  const error = new Error("Page not Found");
  error.statusCode = 404;

  throw error;
};

module.exports = notFound;
