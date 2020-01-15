const express = require ('express');
const router = express.Router();
const Blog = require('../models/Post');
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig'
import { multerUploads, dataUri } from '../middlewares/multerUpload';


router.use("*", cloudinaryConfig);

router.post('/upload', multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
        .upload(file)
        .then(result => {
          const image = result.secure_url
          return res.status(200).json({
            messge: "Your image has been uploded successfully to cloudinary",
            data: {
              image
            }
          });
        })
        .catch(err =>
          res.status(400).json({
            message: "Something went wrong while processing your request",
            data: {
              err
            }
          })
        )
}});

router.get('/posts', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    //Blog.find({}, 'title') to get title only
    Blog.find({})
      .then(data => res.json(data))
      .catch(next)
  });

  router.get('/postitles', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    //Blog.find({}, 'title') to get title only
    Blog.find({}, 'title date imageurl').limit(4)
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