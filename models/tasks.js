var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');

var taskSchema = mongoose.Schema({
    title : { type : String },
    description : { type : String, default : "" },
    completed : { type : Boolean, default : false }
}, { timestamps : true });

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;