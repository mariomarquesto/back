const { Parents, User } = require("../config/db");

const createParent = async (req, res) => {
     try {
          const { userId } = req.body;
          const user = userId ? await User.findByPk(userId) : null;
          if (userId && !user) {
               return res.status(404).json({ error: "User not found not, cant create a parent" })
          }
          const newParent = await Parents.create(req.body);
          if (userId && user) {
               await newParent.addUser(user);
          }
          res.status(201).json({ parent: newParent });
     } catch (error) {
          console.error(error);
          if (error.name === 'SequelizeValidationError') {
               const validationErrors = error.errors.map(err => ({
                    field: err.path,
                    message: err.message,
               }));
               return res.status(400).json({ errors: validationErrors });
          }
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

module.exports = {
     createParent,
};