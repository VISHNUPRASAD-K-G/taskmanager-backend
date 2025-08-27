const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    dueDate: { type: Date, required: true },
    userMail: { type: String, required: true },
    visibility: { type: String, default: 'private'},
});

const tasks = mongoose.model('tasks', taskSchema)

module.exports = tasks

