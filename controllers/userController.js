const tasks = require("../models/taskModel")
const users = require("../models/users")
const jwt = require('jsonwebtoken')

exports.registerController = async(req, res)=>{
    const {username, email, password } = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json('User is already registered.')
        }
        else{
            const newUser = new users({
                username,  
                email, 
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(error){
        res.status(500).json(error)
    }
}

exports.loginController = async(req, res)=>{
    const {email, password} = req.body
    console.log(email, password);
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        
        if(existingUser){
            if(existingUser.password == password){
                const token = jwt.sign({userMail: existingUser.email}, process.env.JWTSECRETKEY)
                res.status(200).json({existingUser, token})
                console.log('edrada');
                
            }
            else{
                res.status(403).json('Invalid credentials')
            }
        }
        else{
            res.status(406).json('User doesnot exists.')
        }
    }catch(error){
        res.status(500).json(error)
    }
}

exports.addtaskController = async(req, res)=>{
    try {
        const { title, description, status, dueDate, userMail } = req.body;

        // Duplicate check (title + userMail + dueDate)
        console.log( title, description, status, dueDate, userMail);
        
        const existingTask = await tasks.findOne({ title, userMail, dueDate });
        if (existingTask) {
            return res.status(403).json( "Task already exists for this user with the same due date" );
        }
        else{
            console.log('efafas');
            
            const newTask = new tasks({
            title,
            description,
            status: status || "Pending",
            dueDate,
            userMail,
        });
        await newTask.save();
        res.status(200).json(newTask);
        }
        
        

    } catch(error){
        res.status(500).json(error)
    }
}

exports.getAlltaskController = async(req, res)=>{
    const {userMail} = req.params
    try{
        const allTasksUser = await tasks.find({userMail}).sort({ dueDate: 1 }); // sorted by due date (earliest first)
        res.status(200).json(allTasksUser);
    }catch(error){
        res.status(500).json(error)
    }
}
    

exports.taskUpdateController = async(req, res)=>{
    try{
        const { id } = req.params;
        const { status } = req.body;
        console.log(status, id);
        
        const updatedTask = await tasks.findByIdAndUpdate(
            {_id:id},
            { $set:{status} },
            { new: true } // return the updated document
        );

        res.status(200).json(updatedTask);
    }catch(error){
        res.status(500).json(error)
    }    
}


// exports.addtaskController = async(req, res)=>{
//     try{}catch(error){
//         res.status(500).json(error)
//     }    
// }
