'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import notes from './api/notes.js';
import path from 'path';


import authRouter from './auth/router.js';
import publicRoute from './api/publicApi.js';

import errorHandler from './middleware/error.js';
import notFound from './middleware/404.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());  // => req.body
app.use(express.urlencoded({extended:true})); // req.body => from a form's key value pairs

app.use(authRouter);
app.use('/', publicRoute);
app.use('/api/notes', notes);

app.use(express.static('client/build'))
app.get('/dashboard', (req,res) => {
  console.log('giet dieash')
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))

})

app.use(notFound);
app.use(errorHandler);

let server = false;

module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) { throw err; }
        console.log('Server running on', port);
      });
    }
    else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    server.close( () => {
      console.log('Server is now off');
    });
  },
};

