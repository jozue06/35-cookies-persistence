'use strict';

let superagent = require('superagent');
let User = require('../model');

const authorize = (req) => {

  let code = req.query.code;

  console.log('(1) code', code);

  // exchange the code or a token
  return superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth`,
      grant_type: 'authorization_code',
    })
    .then( response => {
      let googleToken = response.body.access_token;
      console.log('(2) google token', googleToken);
      return googleToken;
    })
  // use the token to get a user
    .then ( token => {
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`)
        .then (response => {
          let user = response.body;
          console.log('(3) Google User', user);
          return user;
        });
    })
    .then(googleUser => {
      console.log('(4) Creating Account');
      return User.createFromOAuth(googleUser);
    })
    .then (user => {
      console.log('(5) Created User, generating token');
      return user.generateToken();
    })
    .catch(error=>error);
};



module.exports = {authorize};