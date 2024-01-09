const { Valoracion } = require("../config/db");

// Create Valoracion
const createValoracion = async (req, res) => {
  try {
    const valoracion = await Valoracion.create(req.body);
    return res.status(201).json(valoracion);
  } catch (error) {
    console.error(error);
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

module.exports = {
  createValoracion,
  getAllValoraciones,
  getValoracionById,
  updateValoracionById,
  deleteValoracionById,
};
