const { User, Parents, Estudiante } = require("../config/db");

const getAllAdmins = async (_, res) => {
  try {
    const users = await User.findAll({ where: { type: "Admin" } });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const desactAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByPk(id);
    if (!users || !users.state) {
      return res.status(404).json({ error: "Admin not found" });
    }
    await users.update({ state: false });
    return res
      .status(200)
      .json({ message: "Admin deactivated succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const reactAPadre = async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parents.findByPk(id);
    if (!parent || parent.state) {
      return res.status(404).json({ error: "Parent not found" });
    }
    await parent.update({ state: true });
    return res
      .status(200)
      .json({ message: "Parent reactivated succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// FALTAN CONTROLADORES PARA :
/*

DESACTIVAR ADMIN
REACTIVAR PADRE/ESTUDIANTE/ADMIN/CURSO


*/

module.exports = {
  getAllAdmins,
  desactAdmin,
  reactAPadre,
};
