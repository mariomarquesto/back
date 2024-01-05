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
const reactPadre = async (req, res) => {
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
const reactEstudiante = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiantes = await Estudiante.findByPk(id);
    if (!estudiantes || estudiantes.state) {
      return res.status(404).json({ error: "Estudiante not found" });
    }
    await estudiantes.update({ state: true });
    return res
      .status(200)
      .json({ message: "Estudiante reactivated succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const reactAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByPk(id);
    if (!users || users.state) {
      return res.status(404).json({ error: "Admin not found" });
    }
    await users.update({ state: true });
    return res
      .status(200)
      .json({ message: "Admin reactivated succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const reactCurso = async (req, res) => {
  const { id } = req.params;
  try {
    const grades = await Grade.findByPk(id);
    if (!grades || grades.state) {
      return res.status(404).json({ error: "Grade not found" });
    }
    await grades.update({ state: true });
    return res
      .status(200)
      .json({ message: "Grade reactivated succesfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// Se Agregaron CONTROLADORES PARA :
/*
DESACTIVAR ADMIN
REACTIVAR PADRE/ESTUDIANTE/ADMIN

// FALTAN CONTROLADORES PARA :
/*
/CURSO
*/

module.exports = {
  getAllAdmins,
  desactAdmin,
  reactPadre,
  reactEstudiante,
  reactAdmin,
  reactCurso,
};
