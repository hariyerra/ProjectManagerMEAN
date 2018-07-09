
const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      DBconfig = require('./config/ProjectManagerDB'),
      userController = require('./controllers/user.controller')
      projectController = require('./controllers/project.controller'),
      parentTaskController = require('./controllers/parentTask.controller')
      taskController = require('./controllers/task.controller');

const app = express();
var port = process.env.PORT || 4300;

app.use(cors());
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
    mongoose.connect(DBconfig.ConnectionString).then(
      () => {console.log('ProjectManager Database is connected') },
      err => { console.log('Can not connect to the ProjectManager database'+ err)}
    );

mongoose.set('debug', true);

app.use('/users', userController);
app.use('/projects', projectController);
app.use('/parenttasks', parentTaskController);
app.use('/tasks', taskController);


var server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});