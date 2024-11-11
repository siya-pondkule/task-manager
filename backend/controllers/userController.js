const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up
// Sign Up
exports.signup = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
      if (err) {
        console.error('User registration failed:', err);  // Log the error
        return res.status(500).send('User registration failed.');
      }
      res.status(200).send('User registered successfully.');
    });
  };
  
  // Login
  exports.login = (req, res) => {
    const { username, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('Database error on login:', err);  // Log the error
        return res.status(500).send('Error on the server.');
      }
      if (results.length === 0) return res.status(404).send('User Not Found.');
  
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
      res.status(200).send({ auth: true, token });
    });
  };
  