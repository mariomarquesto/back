const { getParentById } = require("./getParentByIdCtrl");
const { Parents } = require("../config/db");

const updateParentById = async (id, data) => {
  try {
    const parent = await getParentById(id);

    if (!parent) return "Parent not Found";

    await Parents.update(data, { where: { id } });
    const updateParent = await getParentById(id);
    return updateParent;
  } catch (error) {
    throw new Error(`fatal error: ${error.message}`);
  }
};

module.exports = {
  updateParentById,
};
