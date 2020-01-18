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
  }
});

router.get('/viewpost', (req, res, next) => {
    //this will return all the data, exposing only the id and action field to the client
    //Blog.find({}, 'title') to get title only
    Blog.findOne({title: req.query.title, cid: req.query.cid})
      .then(data => {res.json(data)
      })
      .catch(next)
  });

router.put('/updatepost', (req, res, next) => {
  Blog.findOneAndUpdate(
    { "title" : req.body.otitle, "cid" : req.body.cid },
    { $set: 
      { "imageurl" : req.body.imageurl,
        "title" : req.body.title,
        "tag" : req.body.tag, 
        "content" : req.body.content
      } 
    }
  ).then(data => res.json(data))
  .catch(next)
});

router.get('/postitles', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  //Blog.find({}, 'title') to get title only
  Blog.find({}, 'title date imageurl cid')
    .then(data => res.json(data))
    .catch(next)
});
  
router.post('/posts', (req, res, next) => {
  Blog.countDocuments({title: (req.body.title)}).then((count) => {
      if(req.body.title){
        req.body.date = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
        if(count == 0){
          req.body.cid = 0
          Blog.create(req.body)
            .then(data => res.json(data))
            .catch(next)
            console.log("Posted")
        }
        else{
          Blog.find({title: "one" }, "cid").sort({cid : -1}).limit(1).then((data) => {
            req.body.cid = data[0].cid + 1
            Blog.create(req.body)
              .then(data => res.json(data))
              .catch(next)
              console.log("Posted Duplicate")
          })
        }
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
  })
});
  
router.delete('/posts/:id', (req, res, next) => {
  Blog.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/test', (req, res, next) => {
  Blog.find({title: "one" }, "cid").sort({cid : -1}).limit(1).then((data) => {
    console.log(new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'}))
    console.log(data[0].cid)
  })
  res.send("done");
})

module.exports = router;