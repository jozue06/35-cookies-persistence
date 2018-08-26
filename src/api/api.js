'use strict';

import express from 'express';
const router = express.Router();
import modelFinder from '../middleware/modelSwitch.js';
router.param('model', modelFinder);

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write('Welcome to the API for lab 34');
  res.end();
});

router.get('/api/v1/:model', (req,res,next) => {
  req.model.find()
    .populate('drum')
    .populate('cymbal')
    .exec()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findById(req.params.id)
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.post('/api/v1/:model', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then( data => {
      sendJSON(res,data) ;
    })
    .catch( err => {
      next();});
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  if(Object.keys(req.body).length) {
    req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return err;
  }
});

router.delete('/api/v1/:model/:id', (req,res,next) => {
  console.log('hit delete route');
  if(Object.keys(req.params.id)) {
    console.log('hit delete route2');
    req.model.findByIdAndDelete(req.params.id, req.body)
      .then(data => sendJSON(res, data))
      .catch(next);
  }
  else {
    return err;
  }
});


export default router;
