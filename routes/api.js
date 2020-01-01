const express = require ('express');
const router = express.Router();
const Blog = require('../models/Post');

router.get('/posts', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    //Blog.find({}, 'title') to get title only
    Blog.find({})
      .then(data => res.json(data))
      .catch(next)
  });
  
  router.post('/posts', (req, res, next) => {
    if(req.body.title){
      Blog.create(req.body)
        .then(data => res.json(data))
        .catch(next)
        console.log("posted")
    }else {
      res.json({
        error: "The input field is empty"
      })
    }
  });
  
  router.delete('/posts/:id', (req, res, next) => {
    Blog.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(next)
  })

module.exports = router;