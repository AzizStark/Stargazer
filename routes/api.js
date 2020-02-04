import express from 'express';
import Blog from '../models/Post';
import { uploader, cloudinaryConfig, v2 } from '../config/cloudinaryConfig'
import { multerUploads, dataUri } from '../middlewares/multerUpload';
import { isValidObjectId } from 'mongoose';
const mongoose = require('mongoose');
const router = express.Router();
const crypto = require('crypto');

router.use("*", cloudinaryConfig);

//Authentication Function to secure APIs
const requireAuth = (req, res, next) => {
  if (req.session.isLogged === true) {
      next();
  } else {
      return false
  }
};

//Auth API for client routes
router.get('/isLogged', (req, res, next) => {
  if(req.session.isLogged === true){
    res.status(200).json({data: "Logged"})
  }
  else{
    res.status(401).json({data: "Error"})
  }
})

//Login
router.post('/login',(req,res,next) => {
  const header = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString()
  const index = header.lastIndexOf(':')
  const user = header.slice(0,index)
  const pass = header.slice(index + 1)

  var hashed = crypto.pbkdf2Sync(pass, process.env.GOLD_KEY, 1000, 64, 'sha256').toString('hex');

  if(hashed === process.env.GOLD_BOX && user === process.env.ADMIN){
    req.session.isLogged = true;
    res.send("Logged In");
  }
  else{
    console.log("Incorrect Credentials")
  }
})



//Upload Image
router.post('/upload', requireAuth, multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader
        .upload(file)
        .then(result => {
          const pid = result.public_id
          const image = result.secure_url
          return res.status(200).json({
            message: "Your image has been uploded successfully to cloudinary",
            imgurl: image,
            public_id: pid
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



//View single post
router.get('/viewpost', (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Blog.findOne({title: req.query.title, cid: req.query.cid})
    .then(data => {res.status(200).json(data)
    })
    .catch(err =>
      res.status(400).json({
        message: "Something went wrong while processing your request",
        data: {
          err
        }
    }))
});

//Update the post
router.put('/updatepost', requireAuth, (req, res, next) => {
  Blog.findOneAndUpdate(
    { "title" : req.body.otitle, "cid" : req.body.cid },
    { $set: 
      { "imageurl" : req.body.imageurl,
        "title" : req.body.title,
        "tag" : req.body.tag, 
        "content" : req.body.content
      } 
    }
  )
  .then(data => res.json(data))
  .catch(err =>
    res.status(400).json({
      message: "Something went wrong while processing your request",
      data: {
        err
      }
  }))
});

//Fetch all posts without content
router.get('/postitles', (req, res, next) => {
  Blog.find({}, 'title date imageurl cid tag')
    .then(data => res.json(data))
    .catch( err =>
      res.status(400).json({
        message: "Something went wrong while processing your request",
        data: {
          err
      }
  }))
});

//Create new post 
router.post('/posts', requireAuth, (req, res, next) => {
  Blog.countDocuments({title: (req.body.title)}).then((count) => {
      if(req.body.title){
        req.body.date = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
        if(count == 0){
          req.body.cid = 0
          Blog.create(req.body)
            .then(data => res.json(data))
            .catch( err => {
              res.status(400).json({
                message: "Something went wrong while processing your request",
                data: {
                  err
                }
            })
            console.log(err)})
        }
        else{
          Blog.find({title: req.body.title}, "cid").sort({cid : -1}).limit(1).then((data) => {
            req.body.cid = data[0].cid + 1
            Blog.create(req.body)
              .then(data => res.json(data))
              .catch(err => {
                res.status(400).json({
                  message: "Something went wrong while processing your request",
                  data: {
                    err
                  }
                })
              })
          }).catch(
            err => {res.status(400).json({
              message: "Something went wrong while processing your request",
              data: {
                err
              }
          })
          console.log(err)})
        }
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
  })
});
  
//delete the post
router.delete('/deletepost',requireAuth, (req, res, next) => {
  Blog.findOne({"_id": req.body.id}, 'cimages')
    .then(data => 
      {
        //Delete CDN Resources associtated with the post.
        v2.api.delete_resources(data.cimages)
        .then( data => res.send(data))
        .catch( err => res.send(err))
      }
    )
    .catch(err =>
      res.status(400).json({
        message: "Something went wrong while processing your request",
        data: {
          err
        }
    }))
  Blog.findOneAndDelete({"_id": req.body.id})
    .then(data => res.json(data))
    .catch( err =>
      res.status(400).json({
        message: "Something went wrong while processing your request",
        data: {
          err
        }
    }))
})

//Mongo, Cloudinary Storage Details
router.get('/usedspace', (req, res, next) => {
  mongoose.connection.db.stats({
    scale: 1024
  })
  .then(data => {
    let monspace = data
    v2.api.usage({}).then( data => {
      let clospace = data;

      const rdata = {
        "MStorage" : monspace.dataSize+monspace.indexSize,
        "CStorage" : clospace.storage.usage,
        "Credits" : clospace.credits.used_percent
       }

      res.send(rdata)
    });
  })
  .catch( err =>
    res.status(400).json({
      message: "Something went wrong while processing your request",
      data: {
        err
      }
  }))
})

//put unused images
router.post('/unused',requireAuth,(req,res,next) => {
  mongoose.connection.db.collection('unusedimages',function (err, collection) {
    collection.findOneAndUpdate({},
      { $push: 
        { 
          "images" : { $each: req.body.imgids} ,
        } 
      })
      .then(data => {
        res.status(200)
      })
      .catch( err =>
        res.status(400).json({
          message: "Something went wrong while processing your request",
          data: {
            err
          }
      }))
  })
})

//clear unused stack
router.delete('/deleteunused',requireAuth, (req,res,next) => {
  mongoose.connection.db.collection('unusedimages',function (err, collection) {
    collection.findOneAndUpdate({},
      { $pull: 
        { 
          images : { $in: req.body.imgids}
        },
      },{ multi: true })
      .then(data => {
        res.status(200).json({
          message: "Something went wrong while processing your request",
        })
      })
      .catch( err =>
        res.status(400).json({
          message: "Something went wrong while processing your request",
          data: {
            err
          }
      }))
  })
})

//delete Unused images from cloudinary
router.delete('/clear',requireAuth, (req,res,next) => {
  mongoose.connection.db.collection('unusedimages',function (err, collection) {
    collection.findOne({}).then(
      data => {
        v2.api.delete_resources(data.images)
        .then( data => {
          console.log("Clearing")
          mongoose.connection.db.collection('unusedimages',function (err, collection) {
            connection.db.collection.findOneAndUpdate({},
              { $set: 
                { 
                  images : [] 
                },
              },{ multi: true })
              .then(data => {
                console.log("Cleared")
                res.status(200).json({
                  message: "Something went wrong while processing your request",
                })
              })
              .catch( err =>
                res.status(400).json({
                  message: "Something went wrong while processing your request",
                  data: {
                    err
                  }
            }))
          })
        })
        .catch( err => res.send(err))
      }
    )
    .catch( err => res.send(err))
  })
})

module.exports = router;