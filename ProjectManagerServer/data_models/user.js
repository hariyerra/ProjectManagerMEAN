//user

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var schemaOptions = {
  toObject: {
    virtuals: true
  }
  ,toJSON: {
    virtuals: true
  }
};

// user Schema
let User = new Schema({
    User_ID: {
    type: Number
  },
  First_Name: {
    type: String,
    required: true
  },
  Last_Name: {
    type: String,
    required: true
  },
  Employee_ID: {
    type: Number,
    required: true   
  },
  Task_ID: {
    type: Number,
    default:null
  },
  Project_ID: {
    type: Number,
    default:null   
  }
}, schemaOptions,
{ collection: 'users' }
); 

User
.virtual('Full_Name')
.get(function () {
  return this.First_Name + ' ' + this.Last_Name;
});

User.plugin(autoIncrement, {inc_field: 'User_ID'}); //auto increment value

module.exports = mongoose.model('User', User);

