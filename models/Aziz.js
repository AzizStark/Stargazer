const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for Aziz
const AzizSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The todo text field is required']
  }
})

//create model for Aziz
const Aziz = mongoose.model('Aziz', AzizSchema);

module.exports = Aziz;
