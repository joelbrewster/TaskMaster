//this file is for writing our logic

//requiring db.js
var Task = require('./db');



//create model content (test)
// var mondayTask = new Task ({
//   task: 'first task',
//   content: 'go to city',
//   done: 'true'
// });
//
// var tuesdayTask = new Task ({
//   task: 'second task',
//   content: 'go to the zoo',
//   done: 'true'
// });
//
// var wednesdayTask = new Task ({
//   task: '8===D ~----~ ',
//   content: 'go to ({})',
//   done: 'true'
// });

//save the model content
// mondayTask.save(function(err) {
//   if (err) throw err;
//   console.log('Task has been created successfully');
// });
//
// tuesdayTask.save(function(err) {
//   if (err) throw err;
//   console.log('Task has been created successfully');
// });
//
// wednesdayTask.save(function(err) {
//   if (err) throw err;
//   console.log('Task has been created successfully');
// });

//find all our tasks
// Task.find({}, function(err, tasks){
//   if (err) throw err;
//   console.log(tasks)
// })

//find one specific instance
// Task.find({task: 'do stuff'}, function(err, task){
//   if (err) throw err;
//   console.log(task);
// });

//grab instances between two now and a month ago(specific dates)
// var monthAgo = new Date();
// monthAgo.setMonth(monthAgo.getMonth() - 1);
// Task.where('created_at').gt(monthAgo).exec(function(err, tasks) {
//  if (err) throw err;
//  // show the admins in the past month
//  console.log(tasks);
// });

//Updating a model (Task)
// Task.find({task: 'first task'}, function(err, task){
//   if (err) throw err;
//   console.log(task)
// })

//Find task by id and update
// Task.findById('576200f02c6eccb0b90472a9', function(err, task){
//   if (err) throw err;
//
//   task.content = 'go to school';
//
//   task.save(function(err){
//     if (err) throw err;
//     console.log('Update successful');
//   });
// });

//Alternative way to find and update
// Task.findByIdAndUpdate('576200f02c6eccb0b90472a9', { content: 'go to Mars' }, function(err, task) {
//  if (err) throw err;
//
//  // we have the updated user returned to us
//  console.log(task);
// });

//Delete a task (model)
// Task.findByIdAndRemove('576200f02c6eccb0b90472a9', function(err) {
//  if (err) throw err;
//
//  console.log('Task deleted!');
// });

//--------------------EXPRESS-------------------------
//using express
var express = require('express');
//use body-parser
var bodyParser = require('body-parser');
//use var connect
var connect = require('connect');
//requires express
var app = express();
//make app use body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//telling the express that we are using ejs as a rendering engine
app.set('view engine', 'ejs');

app.get('/', function(request, response){  //using express for routing and printing out content
    Task.find(function(e, docs){
    response.render('index', {tasks: docs});  //using object syntax because of pug.  
    })

})

app.get('/new', function(request, response){
    response.render('new');
})

app.post('/new', function(req, res){
      if (req.body) {
        console.log(req.body);

        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var task = req.body.task;  //body is a json property, it's not referring to the body tag
        var content = req.body.content;

        //call the create function for our database
        Task.create({
            task : task,
            content : content
        }, function(e, task){
          res.format({
            "text/html": function() {
              res.redirect('/');
            }
            // json: function(){
            //   res.json(task);
            // }
          })
        });
      };
})








app.listen(9000,function(){  //using express to load the server
  console.log('Example app listening on port 9000!');
})
