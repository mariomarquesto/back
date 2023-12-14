const { getParentById } = require("../controllers/getParentByIdCtrl");

const parentByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const parent = await getParentById(id);
    res.status(200).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  parentByIdHandler,
};
