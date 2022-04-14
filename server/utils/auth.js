const jwt = require('jsonwebtoken');

class Auth {
  static createSendToken(user, statusCode, res) {
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    // SEND JWT VIA COOKIE
    const cookieOptions = {
      // Clients browser will delete cookie after it expires, it will expire in 90 days. Converting it to milliseconds so javascript can use it
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // Cookie will only be sent on encrypted connection (https)
      //TODO: Un-comment this in production
      // secure: true,
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // (name of cookie, data, {options})
    res.cookie('jwt', token, cookieOptions);

    // This will remove the password from the output so it doesn't show up
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: user,
      },
    });
  }
}

module.exports = Auth;
