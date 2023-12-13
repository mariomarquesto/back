const { Parents } = require("../config/db");

const getAllParents = async () => {
  const dataBaseParents = await Parents.findAll({
    where: { state: true },
  });

  return dataBaseParents;
};

module.exports = getAllParents;
