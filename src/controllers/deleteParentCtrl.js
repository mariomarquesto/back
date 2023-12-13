const { Parents } = require("../config/db");
const { getParentById } = require("./getParentByIdCtrl");

const deleteParent = async (id) => {
  try {
    const parent = await getParentById(id);
    if (!parent) return "Parent not Found";
    await Parents.update({ state: false }, { where: { id } });
    return true;
  } catch (error) {
    throw new Error(`error trying to delete: ${error.message}`);
  }
};

module.exports = {
  deleteParent,
};
