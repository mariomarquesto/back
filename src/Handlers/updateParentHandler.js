const { updateParentById } = require("../controllers/updateParentCtrl");

const updateParentHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedParent = await updateParentById(id, data);

    if (!updatedParent) {
      return res.status(400).json({ error: "Parent not Found or Inactive" });
    }
    res.status(201).json(updatedParent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateParentHandler,
};
