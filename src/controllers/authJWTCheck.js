// controllers/authController.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res) {
     const token = req.header('Authorization');
     console.log("token: ", token);
     if (!token) return res.sendStatus(401);
     jwt.verify(token, process.env.jwtSecret, (err, user) => {
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
