const express = require('express');
const db = require('./db');
const router = express.Router();

// 🟢 Signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User created successfully' });
    });
});

// 🟢 Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    });
});

// 🟢 Add Task
router.post('/tasks', (req, res) => {
  const { user_id, task_content } = req.body;
  db.query('INSERT INTO tasks (user_id, task_content) VALUES (?, ?)',
    [user_id, task_content],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task added successfully' });
    });
});

// 🟢 Get All Tasks for a User
router.get('/tasks/:user_id', (req, res) => {
  const userId = req.params.user_id;
  db.query('SELECT * FROM tasks WHERE user_id = ?', [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

// 🟢 Delete a Task
router.delete('/tasks/:task_id', (req, res) => {
  const taskId = req.params.task_id;
  db.query('DELETE FROM tasks WHERE id = ?', [taskId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task deleted successfully' });
    });
});

// 🟢 Mark a Task as Complete
router.put('/tasks/:task_id/complete', (req, res) => {
  const taskId = req.params.task_id;
  db.query('UPDATE tasks SET is_complete = 1 WHERE id = ?', [taskId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task marked as complete' });
    });
});

module.exports = router;
