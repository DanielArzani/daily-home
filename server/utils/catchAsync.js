// Function to catch async errors
module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
