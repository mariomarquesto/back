const { deleteParent } = require("../controllers/deleteParentCtrl");

const deleteParentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const parent = await deleteParent(id);
    if (!parent)
      return res
        .status(404)
        .json({ error: "Parent not found or maybe already inactive" });

    return res
      .status(200)
      .json({ message: "Parent unsubscribed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteParentHandler,
};
