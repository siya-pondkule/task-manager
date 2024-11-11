const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController'); // Ensure this is correct
const { verifyToken } = require('../middleware/auth'); // Ensure this middleware is defined
const router = express.Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
