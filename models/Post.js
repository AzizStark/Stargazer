const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Post
const PostSchema = new Schema({
  cid: {
    type: Number,
    required: [true, 'Post ID needed'],
  },
  imageurl: {
    type: String,
    required: [true, 'Image URL required']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  date: {
    type: String,
   required: [true, 'Date is required']
  },
  tag: {
    type: String,
    required: [true, 'tag is required']
  },
  content: {
    type: String,
    required: [true, 'String is required']
  },
  cimages: {
    type: Array
  }
})

//create model for posts
const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
