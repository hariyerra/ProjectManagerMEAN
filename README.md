# ProjectManager MEAN stack Application sample

Project Manager application is a Single Page Application (SPA) to keep track of projects,
their respective tasks, their status and priorities.

This application is developed using MEAN stack such as Angular 6, Node JS(8.x), Express JS and Mongo DB(4.x).

This project contains two folders.
1. Project Manager Client - Front end SPA developed uing Angular 6, Angular CLI, HTML 5, BootStrap

2. Project Manager Server - Rest APIs developed using Node+Express JS and MongoDB with Mongoose driver

Installation and Run steps:

1. Set up MongoDB.
to set up mongodb in local, follow this page - https://docs.mongodb.com/manual/installation

start the server if installed locally,
> cd "<path to...MongoDB\Server\4.0\bin>mongo.exe

once set up or already having remote mongodb hosted service, copy the mongogb url.

2. Open ProjectManagerServer folder, run these steps -
>npm install

configure mongodb url in /config/ProjectManagerDB.js

configure port in server.js. default port is 4300

> npm start server

By now, Rest API is connected to MongoDB and running.

3. Open ProjectManagerClient folder, run these steps -
 > npm install
 
 modify the urls and port config in environment.ts file per step 2.
 
 > ng build
 > ng server --open
 
 frontend UI is running on local anguar cli server with default port 4200.
 
