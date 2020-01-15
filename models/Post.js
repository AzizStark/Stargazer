const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Post
const newpost = new Schema({
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
  }
})

//create model for posts
const Post = mongoose.model('Post', newpost);
/*var awesome_instance = new Post({ title: 'awesome work yes', date: '12-12-sep',tag: '#sun', content: '<h1> Hello World</h1>'});

awesome_instance.save(function (err) {
  if (err) return "Error";
  // saved!
});
 */
module.exports = Post;
