const tasks = require("../models/taskModel");
const users = require("../models/users")


exports.getAllUsersController = async(req, res)=>{
    try{
        const existingUser = await users.find({ email: { $ne: 'admin@teamspirit.com' } });
        res.status(200).json(existingUser)
    }catch(error){
        res.status(500).json(error)
    }
}

exports.userDeleteController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await users.findByIdAndDelete({ _id:id })

        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAlltaskAdminController = async(req, res)=>{
    try{
        const allTasksUser = await tasks.find().sort({ dueDate: 1 }); // sorted by due date (earliest first)
        res.status(200).json(allTasksUser);
    }catch(error){
        res.status(500).json(error)
    }
}

exports.taskVisibilityUpdateController = async(req, res)=>{
    try{
        const { id } = req.params;
        const { visibility } = req.body;
        console.log(visibility, id);
        
        const updatedTask = await tasks.findByIdAndUpdate(
            {_id:id},
            { $set:{visibility} },
            { new: true } // return the updated document
        );

        res.status(200).json(updatedTask);
    }catch(error){
        res.status(500).json(error)
    }    
}

exports.deleteTaskController = async (req, res) => {
    const { id } = req.params
    try {
        const deletedTask = await tasks.findByIdAndDelete({ _id:id })

        return res.status(200).json(deletedTask)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.editTaskController = async(req, res)=>{
    try{
        const { id } = req.params;
        const { title, description, dueDate, status} = req.body;
        
        const updatedTask = await tasks.findByIdAndUpdate(
            {_id:id},
            { $set:{title,description, dueDate, status} },
            { new: true } // return the updated document
        );

        res.status(200).json(updatedTask);
    }catch(error){
        res.status(500).json(error)
    }  
}