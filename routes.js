const express = require('express')

const routes = new express.Router()

const userControllers = require('./controllers/userController')

const adminControllers = require('./controllers/adminController')

// ===================================  Routes  =====================================

routes.post('/register', userControllers.registerController)

routes.post('/login', userControllers.loginController)

routes.get('/all-users-registered', adminControllers.getAllUsersController)

routes.delete('/delete-user/:id', adminControllers.userDeleteController);

routes.get('/all-user-tasks-admin', adminControllers.getAlltaskAdminController)

routes.put('/user-tasks-visibility-update/:id', adminControllers.taskVisibilityUpdateController)

routes.delete('/delete-task/:id', adminControllers.deleteTaskController);

routes.put('/user-tasks-edit-admin/:id', adminControllers.editTaskController)


// 

routes.post('/add-task-user', userControllers.addtaskController)

routes.get('/user-specfic-tasks/:userMail', userControllers.getAlltaskController)

routes.put('/user-specfic-tasks-update/:id', userControllers.taskUpdateController)



module.exports = routes