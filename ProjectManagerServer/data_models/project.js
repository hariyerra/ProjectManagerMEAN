//project

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const Task = require('./task')

var schemaOptions = {
  toObject: {
    virtuals: false
  }
  , toJSON: {
    virtuals: true
  }
};

// Project Schema
let Project = new Schema({
  Project_ID: {
    type: Number
  },
  Project: {
    type: String,
    required: true
  },
  Start_Date: {
    type: Date,
    default: null,
  },
  End_Date: {
    type: Date,
    default: null,
  },
  Priority: {
    type: Number
  },
  Manager_ID: {
    type: Number,
    default: null,
  }
},
  schemaOptions,
  {
    collection: 'projects'
  });

Project
  .virtual('Tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'Project'
  });

Project
  .virtual('NoOfTasks').get(function () {
    return this.get('Tasks') ? this.get('Tasks').length : 0;
  });

Project
  .virtual('CompletedTasks').get(function () {
    if (this.get('Tasks') && this.get('Tasks').length > 0) {
      var tasks = this.get('Tasks').filter(function (task) {
        return task.Status == 1;
      });

      return tasks.length;
    }
    else {
      return 0;
    }
  });


Project.plugin(autoIncrement, { inc_field: 'Project_ID' }); //auto increment value

module.exports = mongoose.model('Project', Project);

