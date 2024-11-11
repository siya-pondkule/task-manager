const jwt = require('jsonwebtoken');
const db = require('../config/db.js');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send('No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    next();
  });
};

// Create Task
exports.createTask = (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  db.query('INSERT INTO tasks (title, description, dueDate, status, priority) VALUES (?, ?, ?, ?, ?)', 
  [title, description, dueDate, status, priority], (err) => {
    if (err) return res.status(500).send('Error creating task');
    res.status(201).send('Task created successfully');
  });
};

// Get Tasks
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send('Error fetching tasks');
    res.json(results);
  });
};

// Update Task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status, priority } = req.body;
  db.query('UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ?, priority = ? WHERE id = ?', 
  [title, description, dueDate, status, priority, id], (err) => {
    if (err) return res.status(500).send('Error updating task');
    res.send('Task updated successfully');
  });
};

// Delete Task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Error deleting task');
    res.send('Task deleted successfully');
  });
};
