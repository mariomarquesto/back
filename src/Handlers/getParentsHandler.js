const getAllParents = require("../controllers/getParentCtrl");

const getAllParentsHandler = async (req, res) => {
  try {
    const parents = await getAllParents();
    res.status(200).json(parents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllParentsHandler };
