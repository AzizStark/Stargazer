const express = require ('express');
const router = express.Router();
const Aziz = require('../models/Aziz');

router.get('/aziz', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    Aziz.find({}, 'action')
      .then(data => res.json(data))
      .catch(next)
  });
  
  router.post('/aziz', (req, res, next) => {
    if(req.body.action){
      Aziz.create(req.body)
        .then(data => res.json(data))
        .catch(next)
    }else {
      res.json({
        error: "The input field is empty"
      })
    }
  });
  
  router.delete('/aziz/:id', (req, res, next) => {
    Aziz.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(next)
  })

module.exports = router;