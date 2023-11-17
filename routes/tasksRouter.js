const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.createNewTask)
    .put(tasksController.updateTasks)
    .patch(tasksController.updateTask)
    .delete(tasksController.deleteTasks)
    
router.delete('/:id', tasksController.deleteTask)
    
module.exports = router;
