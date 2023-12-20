// controllers/authController.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res) {
     const token = req.header('Authorization');
     if (!token) return res.sendStatus(401);
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
               res.sendStatus(403);
          } else {
               res.json({ user });
          }
     });
}

module.exports = {
     authenticateToken,
};
