const { Parents, Estudiante } = require("../config/db");

const getStudentIdByParentId = async (req, res) => {
  const { parentId } = req.params;
  try {
    const estudianteParent = await Parents.findByPk(parentId, {
      include: {
        model: Estudiante,
        attributes: ["id"],
        through: { attributes: [] },
      },
    });

    if (!estudianteParent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    const estudianteIds = estudianteParent.Estudiantes.map(
      (estudiante) => estudiante.id
    );

    const estudianteDetail = await Estudiante.findAll({
      where: {
        id: estudianteIds,
      },
      attributes: [
        "id",
        "idDocumento",
        "nombres",
        "apellidoPat",
        "apellidoMat",
        "Nacionalidad",
        "fechNac",
        "sexo",
        "peso",
        "estatura",
        "alergias",
        "grupoSanguineo",
        "contactoEmerg",
        "fotoPerfil",
        "validate",
        "estadoPago",
        "state",
      ],
    });

    res.status(200).json({ estudianteDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudentIdByParentId,
};
