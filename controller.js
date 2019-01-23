var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Task = require('./models/tasks');

module.exports = {
    index: function(request, response){
        Task.find({}, function(err, tasks){
            if(err) {
                console.log("An error was encountered", err);

                response.json({ message : "Error", error : err });
            }
            else {
                response.json(tasks);
            }
        });
    },
    task: function(request, response){
        Task.find({ _id : request.params.id }, function(err, task){
            if(err) {
                console.log("An error was encounter", err);
                response.json({ message : "Error", error : err });
            }
            else {
                response.json(task);
            }
        });
    },
    newtask: function(request, response){
        var data = request.body;
        console.log(data);
        Task.create(data, function(err, task){
            if(err){
                console.log("An error occurred", err);
                response.json({ message : "Error", error : err });
            }
            else {
                response.redirect('/api/tasks/'+task._id);
            }
        });
    },
    edittask: function(request, response){
        var data = request.body;
        console.log(data);
        console.log(request.params.id);
        Task.findByIdAndUpdate(request.params.id, data, function(err, task){
            if(err) {
                console.log("An error occurred", err);
                response.json({ message : "Error", error : err });
            }
            else {
                console.log("it worked?");
                response.redirect('/api/tasks/'+task._id);
            }
        });
    },
    delete: function(request, response){
        Task.remove({ _id : request.params.id }, function(err, task){
            if(err) {
                console.log("An error occurred", err);
                response.json({ message : "Error", error : err });
            }
            else {
                response.redirect('/api/tasks/');
            }
        })
    }
}