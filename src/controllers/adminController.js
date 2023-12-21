const { User, Parents, Estudiante } = require("../config/db");

const admin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user || !user.state) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// CONTROLADORES VISTAS PADRES
const getParentsActive = async (_, res) => {
  try {
    const parents = await Parents.findAll({
      where: { validate: true, state: true },
    });
    return res.status(200).json({ count: parents.length, parents });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getParentsPending = async (_, res) => {
  try {
    const parents = await Parents.findAll({ where: { validate: false } });
    return res.status(200).json(parents);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const parentDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parents.findByPk(id);
    if (!parent || !parent.state) {
      return res.status(404).json({ error: "Parent not found" });
    }
    return res.status(200).json(parent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const approvedParent = async (req, res) => {
  const { id } = req.params;
  try {
    const parent = await Parents.findByPk(id);
    if (!parent || !parent.state) {
      return res.status(404).json({ error: "Parent not found" });
    }
    await Parents.update({ validate: true }, { where: { id } });
    return res.status(200).json({ message: "Parent approved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//CONTROLADORES VISTAS ESTUDIANTES
const getStudentsActive = async (req, res) => {
  try {
    const student = await Estudiante.findAll({
      where: { validate: true, state: true },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudentsPending = async (req, res) => {
  try {
    const student = await Estudiante.findAll({
      where: { validate: false },
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const studentDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Estudiante.findByPk(id);
    if (!student || !student.state) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const approvedStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Estudiante.findByPk(id);
    if (!student || !student.state) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Estudiante.update({ validate: true }, { where: { id } });
    return res
      .status(200)
      .json({ message: "Estudiante approved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  admin,
  getParentsActive,
  getParentsPending,
  parentDetail,
  approvedParent,
  getStudentsActive,
  getStudentsPending,
  studentDetail,
  approvedStudent,
};
