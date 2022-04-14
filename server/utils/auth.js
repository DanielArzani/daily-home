const jwt = require('jsonwebtoken');

// token expiration date
const expiration = '2h';

class Auth {
  // Function to send JWT ~ Since we keep having to write a similar code with most of the res.status.json()'s
  static createSendToken(user, statusCode, res) {
    // const { ...payload } = user;

    // const token = this.signToken(user._id);
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: expiration,
    });

    // SEND JWT VIA COOKIE
    const cookieOptions = {
      // Clients browser will delete cookie after it expires, it will expire in 90 days, we are converting it to milliseconds so javascript can use it
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // Cookie will only be sent on encrypted connection (https)
      // This will prevent us from testing it so we only want it on production
      // secure: true,
      // Will prevent the cookie from being accessed or modified by the browser ~ This is a common security measure to help prevent cross-site-scripting attacks
      // All the browser needs to do with the cookie is receive it, store it and send it along with every request
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // To send a cookie we attach it to the response object, afterwards we specify the name of the cookie, the data we want to send and some options
    // NOTE A name is a unique identifier for a cookie, if they receive a cookie with the same name, the old one will be replaced
    res.cookie('jwt', token, cookieOptions);

    // This will remove the password from the output so it doesn't show up
    // We're not saving this into the database so I guess its okay?
    user.password = undefined;

    res.status(statusCode).json({
      status: 'success',
      // We are sending the token to the user ~ A new user was just created so we are sending a token with their id which they will store
      token,
      data: {
        user: user,
      },
    });
  }
}

module.exports = Auth;
