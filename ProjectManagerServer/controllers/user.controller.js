
/* user API routes */

const express = require('express'),
    userController = express.Router(),
    url = require('url');

let User = require('../data_models/user');

//list users
userController.route('/').get(function (req, res) {

    var userQuery = User.find();

    var queryparams = req.query;

    if (queryparams.searchKey) {
        userQuery.or([
            { 'First_Name': { $regex: queryparams.searchKey, $options: 'i' } },
            { 'Last_Name': { $regex: queryparams.searchKey, $options: 'i' } }]);
    }

    if (queryparams.sortKey) {
        userQuery.sort([[queryparams.sortKey, 1]]);
    }

    userQuery.exec(function (err, users) {

        if (err) {
            res.json({ 'Success': false })
        }
        else {
            res.json({ 'Success': true, 'Data': users });
        }
    });
});

// add new user
userController.route('/add').post(function (req, res) {

    let user = new User(req.body);
    console.log(user);
    user.save()
        .then(user => {
            res.status(200).json({ 'Success': true })
        })
        .catch(err => {
            res.status(400).send({ 'Success': false, 'Message': 'Error occured while creating new user' });
        });

});

// update user
userController.route('/edit/:id').post(function (req, res) {

    let userId = req.params.id;

    User.findOne({ User_ID: userId }, function (err, user) {
        if (!user)
            return next(new Error('user not found'));
        else {
            user.First_Name = req.body.First_Name;
            user.Last_Name = req.body.Last_Name;
            user.Employee_ID = req.body.Employee_ID;

            user.save().then(user => {
                res.json({ 'Success': true });
            })
                .catch(err => {
                    res.status(400).json({ 'Success': false });
                });
        }
    });
});


//delete user
userController.route('/delete/:id').get(function (req, res) {

    let userId = req.params.id;

    User.find({ User_ID: userId }).remove(function (err, user) {
        if (err)
            res.json({ 'Success': false, 'Message': 'User not found' });
        else
            res.json({ 'Success': true });
    });
});

//get user
userController.route('/:id').get(function (req, res) {

    let userId = req.params.id;

    User.findOne({ User_ID: userId }, function (err, user) {
        if (err) {
            res.json({ 'Success': false, 'Message': 'User not found' })
        }
        else {
            res.json({ 'Success': true, 'Data': user });
        }
    });
});

// assign project as Manager
userController.route('/edit/:id').post(function (req, res) {

    let userId = req.params.id;

    User.findOne({ User_ID: userId }, function (err, user) {
        if (!user)
            return next(new Error('user not found'));
        else {
            user.update({ 'Project_ID': req.body.Project_ID }).then(user => {
                res.json({ 'Success': true });
            })
                .catch(err => {
                    res.status(400).json({ 'Success': false });
                });
        }
    });
});

// assign new task
userController.route('/edit/:id').post(function (req, res) {

    let userId = req.params.id;

    User.findOne({ User_ID: userId }, function (err, user) {
        if (!user)
            return next(new Error('user not found'));
        else {
            user.update({ 'Task_ID': req.body.Task_ID }).then(user => {
                res.json({ 'Success': true });
            })
                .catch(err => {
                    res.status(400).json({ 'Success': false });
                });
        }
    });
});


module.exports = userController;
