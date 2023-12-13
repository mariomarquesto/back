const { Parents } = require("../config/db");

const getParentById = async (id) => {
  try {
    const idMatch = await Parents.findByPk(id);
    return idMatch;
  } catch (error) {
    throw new Error(`Error fetching parent by ID: ${error.message}`);
  }
};

module.exports = {
  getParentById,
};
