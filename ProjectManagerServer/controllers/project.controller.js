
/* project API routes */

const express = require('express'),
    projectController = express.Router(),
    url = require('url');

let Project = require('../data_models/project');

let User = require('../data_models/user');

//list projects
projectController.route('/').get(function (req, res) {

    var projectQuery = Project.find();

    var queryparams = req.query;

    if (queryparams.searchKey) {
        projectQuery.or([
            { 'Project': { $regex: queryparams.searchKey, $options: 'i' } }]);
    }

    if (queryparams.sortKey) {
        projectQuery.sort([[queryparams.sortKey, 1]]);
    }

    projectQuery
    .populate('Tasks', ['Task_ID', 'Status'])
    .exec(function (err, projects) {

        if (err) {
            res.json({ 'Success': false })
        }
        else {
          
            res.json({ 'Success': true, 'Data': projects });
            console.log(projects);
        }
    });
});

// add new project
projectController.route('/add').post(function (req, res) {

    let project = new Project(req.body);

    project.save()
        .then(project => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Error occured while creating new user' });
        });
});

// update project
projectController.route('/edit/:id').post(function (req, res) {

    let projectId = req.params.id;

    Project.findOne({ Project_ID: projectId }, function (err, project) {
        if (!project)
            return next(new Error('project not found'));
        else {
            project.Project = req.body.Project;
            project.Priority = req.body.Priority;
            project.Manager_ID = req.body.Manager_ID;
            project.Start_Date = req.body.Start_Date;
            project.End_Date = req.body.End_Date;

            project.save().then(project => {
                res.json({ 'Success': true });
            })
                .catch(err => {
                    res.status(400).json({ 'Success': false });
                });
        }
    });
});

//delete project
projectController.route('/delete/:id').get(function (req, res) {

    let projectId = req.params.id;

    Project.find({ Project_ID: projectId }).remove(function (err, user) {
        if (err)
            res.json({ 'Success': false, 'Message': 'Project not found' });
        else
            res.json({ 'Success': true });
    });
});


//get project
projectController.route('/:id').get(function (req, res) {

    let projectId = req.params.id;

    Project
    .findOne({ Project_ID: projectId }, function (err, project) {
        if (err) {
            res.json({ 'Success': false, 'Message': 'Project not found' })
        }
        else {
            res.json({ 'Success': true, 'Data': project });
        }
    });
});

module.exports = projectController;
