const jwt = require('jsonwebtoken');

// token expiration date
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    // BEARER TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  },
  signToken: function (user) {
    const { ...payload } = user;

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiration,
    });
  },
};
