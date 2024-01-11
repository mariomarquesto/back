const { Valoracion, Parents } = require("../config/db");
const { conn } = require("../config/db");

// Create Valoracion
const createValoracion = async (req, res) => {
  try {
    const { parentId } = req.body;
    const parent = parentId ? await Parents.findByPk(parentId) : null;

    if (!parentId && !parent) {
      return res
        .status(404)
        .json({ error: "Parent not found, cant create valoracion" });
    }
    const newValoracion = await Valoracion.create(req.body);

    if (parentId && parent) {
      await newValoracion.addParent(parent);
    }
    return res.status(201).json({ valoracion: newValoracion });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ errors: validationErrors });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// todas las Valoraciones
const getAllValoraciones = async (_, res) => {
  try {
    const valoraciones = await Valoracion.findAll();
    return res.status(200).json(valoraciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Valoracion by ID
const getValoracionById = async (req, res) => {
  const { id } = req.params;
  try {
    const valoracion = await Valoracion.findByPk(id);
    if (!valoracion) {
      return res.status(404).json({ error: "Valoracion no encontrada" });
    }
    return res.status(200).json(valoracion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Valoracion by ID
const updateValoracionById = async (req, res) => {
  const { id } = req.params;
  try {
    const valoracion = await Valoracion.findByPk(id);
    if (!valoracion) {
      return res.status(404).json({ error: "Valoracion no encontrada" });
    }
    await Valoracion.update(req.body, { where: { id } });
    const updatedValoracion = await Valoracion.findByPk(id);
    return res.status(200).json(updatedValoracion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Valoracion by ID
const deleteValoracionById = async (req, res) => {
  const { id } = req.params;
  try {
    const valoracion = await Valoracion.findByPk(id);
    if (!valoracion) {
      return res.status(404).json({ error: "Valoracion no encontrada" });
    }
    await Valoracion.destroy({ where: { id } });
    return res
      .status(200)
      .json({ message: "Valoracion eliminada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const hasParentRated = async (req, res) => {
  const { parentId } = req.params;

  try {
    const result = await conn.models.valoracionPadre.findOne({
      where: { ParentId: parentId },
    });

    if (result) {
      res.status(200).json({ hasRated: true });
    } else {
      res.status(200).json({ hasRated: false });
    }
  } catch (error) {
    console.error(
      "Error al verificar si el padre ha realizado una valoración:",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createValoracion,
  getAllValoraciones,
  getValoracionById,
  updateValoracionById,
  deleteValoracionById,
  hasParentRated,
};
