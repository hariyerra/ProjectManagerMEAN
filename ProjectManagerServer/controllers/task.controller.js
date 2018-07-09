
/* Task API routes */

const express = require('express'),
    taskController = express.Router(),
    url = require('url');

let Task = require('../data_models/task');
let Project = require('../data_models/project');

//list tasks of that project
taskController.route('/').get(function (req, res) {

    var taskQuery = Task.find();

    var queryparams = req.query;

    if (queryparams.projectId) {

        Project.findOne({ Project_ID: queryparams.projectId }, function (err, project) {

            taskQuery.or([
                { Project: project._id }
            ]);

            if (queryparams.sortKey) {
                var sortdirection = 1;
                if(queryparams.sortKey=="Status"){
                    sortdirection = -1;
                }
                taskQuery.sort([[queryparams.sortKey, sortdirection]]);
            }

            taskQuery
                .populate('Project')
                .populate('User')
                .populate('Parent');

            taskQuery.exec(function (err, tasks) {

                if (err) {
                    res.json({ 'Success': false })
                }
                else {
                    res.json({ 'Success': true, 'Data': tasks });
                }
            });
        });
    }
});

// add new task
taskController.route('/add').post(function (req, res) {

    let newTask = new Task(req.body);

    newTask.save()
        .then(newTask => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': err });
        });
});

//get single task
taskController.route('/:id').get(function (req, res) {

    let taskId = req.params.id;

    var taskQuery = Task.findOne({ Task_ID: taskId })
        .populate('Project')
        .populate('User')
        .populate('Parent');

    taskQuery.exec(function (err, task) {
        if (err) {
            res.json({ 'Success': false, 'Message': 'task not found' })
        }
        else {
            res.json({ 'Success': true, 'Data': task });
        }
    });
});

// udate task
taskController.route('/edit').post(function (req, res) {

    let updateTask = new Task(req.body);

    Task.findOne({ Task_ID: updateTask.Task_ID }, function (err, task) {
       
        task.Task = updateTask.Task;
        task.Priority = updateTask.Priority;
        task.Start_Date = updateTask.Start_Date;
        task.End_Date = updateTask.End_Date;
        task.Parent = updateTask.Parent;

        task.save().then(updateTask => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Error occured while updating doc' });
        });

    });
});


//end task
taskController.route('/delete/:id').get(function (req, res) {

    let taskId = req.params.id;

    Task.findOne({ Task_ID: taskId }, function (err, task) {
       
        task.Status = 1;
        
        task.save().then(updateTask => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Error occured while updating doc' });
        });

    });
});



module.exports = taskController;
