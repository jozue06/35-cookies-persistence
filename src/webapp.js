'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
// let morgan = require('morgan');
// let csurf = require('csurf');
let cookieParser = require('cookie-parser');
let authRouter = require( '../auth/router');

let config = require('./config');


let routes = require('./controllers/index');
let notifications = require('./controllers/notifications');



// Create Express web app
let app = express();

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== 'test') {
  // app.use(morgan('combined'));
}

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'pug');


// Parse incoming form-encoded HTTP bodies
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true,
}));


// Create and manage HTTP sessions for all requests
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
}));

// Use connect-flash to persist informational messages across redirects
app.use(flash());


// Add CSRF protection for web routes

// app.use(csurf());
// app.use(function(request, response, next) {
//   response.locals.csrftoken = request.csrfToken();
//   next();
// });


app.use('/', routes);
app.use('/notifications', notifications);
app.use(authRouter );


// production error handler
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {},
//   });
// });


module.exports = app;
