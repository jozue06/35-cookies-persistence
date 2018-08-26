'use strict';

let User = require('./model.js');

module.exports = (req, res, next) => {

  let authorize = (token) => {
    console.log('check the token--->', token);
    // Given a token, check with the User model to see if its valid
    User.authorize(token)
      .then(user => {
        // We will always get back a "user" from mongo ... although it might be real and it might be null
        if(!user) { getAuth(); }
        // Given a real user that must mean that our token was good. Let the user through.
        // in larger systems, you might want to attach an ACL or permissions to the req.user object here.
        else {
          req.token=token;
          next();
        }
      })
      .catch(next);
  };

  let authenticate = (auth) => {
    console.log('check the token--->3 auth', auth);
    // Validate the user using the model's authenticate method
    User.authenticate(auth)
    // We will always get back a "user" from mongo ... although it might be real and it might be null
      .then(user => {
        // If it's null, go to getAuth() ... which should return an error or a login page
        if (!user) { getAuth(); }
        // We must have a good user.  Generate a token and jack that onto the req object and move on
        // we could alternatively put the whole user instance on req.user if there's need for it later?
        else {
          req.token = user.generateToken();
          next();
        }
      })
    // Send any errors to next() which will invoke the error handling middleware
      .catch(next);

  };

  // If we're not authenticated either show an error or pop a window
  let getAuth = () => {
    // res.set({
    //   'WWW-Authenticate': 'Basic realm="Super Secret Area"'
    // }).send(401);

    // Send back a JSON formatted error object through our middleware
    next({status:401,statusMessage:'Unauthorized',message:'Invalid User ID/Password'});
  };

  // Try to authenticate -- parse out the headers and do some work!
  try {
    let cookie = req.cookies.auth;
    console.log('check the cookie train--->1 cookie', cookie);

    if(!cookie){
      console.log('check there is NOT cookie--->2 cookie', cookie);
      
    }
    if(cookie){
      console.log('check there is cookie--->2 cookie', cookie);
      authorize(cookie);
      // authenticate(cookie);
    }

    else {
      getAuth();

    }
    

  } catch(e) {
    next(e);
  }

};