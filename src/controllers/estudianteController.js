const express = require('express');
const router = express.Router();
const { Estudiante } = require('../config/db');

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
      const estudiantes = await Estudiante.findAll({ where: { state: true } });
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
      if (!estudiante || !estudiante.state) {
           return res.status(404).json({ error: "Estudiante not found" })
      }
      return res.status(200).json(estudiante);
 } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
 }
};
      
  
  const updateEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante || !estudiante.state) {
           return res.status(404).json({ error: "Estudiante not found" })
      }
      await Estudiante.update(req.body, { where: { id } });
      const updateEstudiante = await Estudiante.findByPk(id);
      return res.status(200).json(updateEstudiante);
 } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
 }
};
      
  
  const deleteEstudianteById = async (req, res) => {
    const { id } = req.params;
    try {
      const estudiante = await Estudiante.findByPk(id);
          if (!estudiante || !estudiante.state) {
               return res.status(404).json({ error: "Estudiante not found" })
          }
          await Estudiante.update({ state: false }, { where: { id } });
          return res.status(200).json({ message: "Estudiante deleted successfully" });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
     }
};
      
  
  module.exports = {
    createEstudiante,
    getAllEstudiantes,
    getEstudianteById,
    updateEstudianteById,
    deleteEstudianteById,
  };