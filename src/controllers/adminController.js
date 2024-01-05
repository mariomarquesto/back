const { User, Parents, Estudiante } = require("../config/db");
const { sendConfirmationEmailPadre } = require("../notif/nodemail/validaNotifPadre");
const { sendConfirmationEmailEstudiante } = require("../notif/nodemail/validaNotifEstud");

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

// Fn para ordenado padres:
const applySorting = (queryOptions, sort, order) => {
  let orderClause = null;

  if (sort === "name") {
    orderClause = [["name", order]];
  } else if (sort === "idDoc") {
    orderClause = [["idDoc", order]];
  }

  if (orderClause) {
    queryOptions.order = orderClause;
  }

  return queryOptions;
};
// Fn ordenado estudiantes
const applySortingStudents = (queryOptions, sort, order) => {
  let orderClause = null;

  if (sort === "nombres") {
    orderClause = [["nombres", order]];
  } else if (sort === "idDocumento") {
    orderClause = [["idDocumento", order]];
  }

  if (orderClause) {
    queryOptions.order = orderClause;
  }

  return queryOptions;
};

// CONTROLADORES PADRES

const getAllParents = async (req, res) => {
  try {
    let queryOptions = {
      where: { state: true },
    };

    queryOptions = applySorting(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );

    const parents = await Parents.findAll(queryOptions);
    res.status(200).json(parents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getParentsActive = async (req, res) => {
  try {
    let queryOptions = {
      where: { validate: true, state: true },
    };

    queryOptions = applySorting(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );

    const parents = await Parents.findAll(queryOptions);
    res.status(200).json(parents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getParentsPending = async (req, res) => {
  try {
    let queryOptions = {
      where: { validate: false, state: true },
    };

    queryOptions = applySorting(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );

    const parents = await Parents.findAll(queryOptions);
    res.status(200).json(parents);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    const { email } = parent;
    await Parents.update({ validate: true }, { where: { id } });
    await sendConfirmationEmailPadre(email)
    return res.status(200).json({ message: "Parent approved successfully" });
    
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//CONTROLADORES VISTAS ESTUDIANTES

const allStudents = async (req, res) => {
  try {
    let queryOptions = {
      where: { state: true },
    };

    queryOptions = applySortingStudents(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );
    const student = await Estudiante.findAll(queryOptions);
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getStudentsActive = async (req, res) => {
  try {
    let queryOptions = {
      where: { validate: true, state: true },
    };

    queryOptions = applySortingStudents(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );
    const student = await Estudiante.findAll(queryOptions);
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudentsPending = async (req, res) => {
  try {
    let queryOptions = {
      where: { validate: false, state: true },
    };

    queryOptions = applySortingStudents(
      queryOptions,
      req.query.sort,
      req.query.order || "ASC"
    );
    const student = await Estudiante.findAll(queryOptions);
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
    const student = await Estudiante.findByPk(id, {
      include: [
        {
          model: Parents,
          include: [
            {
              model: User,
              attributes: ['email'],
            },
          ],
        },
      ],
    });

    if (!student || !student.state) {
      return res.status(404).json({ error: "Student not found" });
    }

    await Estudiante.update({ validate: true }, { where: { id } });

    
    const parent = await Parents.findOne({
      where: { id: student.Parents[0]?.id },
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    if (parent === undefined || parent.dataValues === undefined ) {
      console.log(parent);
      return res.status(500).json({ error: "Parent's email not found" });
    }

    const userEmail = parent.dataValues.email;

    await sendConfirmationEmailEstudiante(userEmail);

    return res.status(200).json({ message: "Estudiante approved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  admin,
  getAllParents,
  getParentsActive,
  getParentsPending,
  parentDetail,
  approvedParent,
  getStudentsActive,
  getStudentsPending,
  studentDetail,
  approvedStudent,
  allStudents,
};
