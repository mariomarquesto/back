const express = require('express');
const router = express.Router();
const { Estudiante } = require('../models/estudiante');

const createEstudiante = async (req, res) => {
    try {
      const newEstudiante = await Estudiante.create(req.body);
      res.status(201).json(newEstudiante);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getAllEstudiantes = async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll();
      res.status(200).json(estudiantes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        return res.status(404).json({ error: 'No se encontro Estudiante' });
      }
      res.status(200).json(estudiante);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  const updateEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
      const [updatedRowsCount, updatedEstudiantes] = await Estudiante.update(req.body, {
        where: { idEstudiante: id },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        return res.status(404).json({ error: 'No se encontro Estudiante' });
      }
      res.status(200).json(updatedEstudiantes[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRowCount = await Estudiante.destroy({
        where: { idEstudiante: id },
      });
      if (deletedRowCount === 0) {
        return res.status(404).json({ error: 'No se encontro Estudiante' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createEstudiante,
    getAllEstudiantes,
    getEstudianteById,
    updateEstudianteById,
    deleteEstudianteById,
  };