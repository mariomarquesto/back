const { Parents, User } = require("../config/db");

const getParentIdsByUserId = async (req, res) => {
     const { userId } = req.params;
     try {
          const userParents = await User.findByPk(userId, {
               include: {
                    model: Parents,
                    attributes: ["id"],
                    through: { attributes: [] },
               }
          });
          if (!userParents) {
               return res.status(404).json({ error: 'User not found' });
          }
          // Extract the Parents ids from the result
          const parentIds = userParents.Parents.map(parent => parent.id);
          // Look up the Parents table with the extracted Parents ids
          const parentDetails = await Parents.findAll({
               where: { id: parentIds },
               attributes: ["id"],
          });
          res.status(200).json({ parentDetails });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
     }
};

module.exports = {
     getParentIdsByUserId,
};
