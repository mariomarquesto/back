const express = require('express');
const {
    createEstudiante,
    getEstudianteById,
    updateEstudianteById,
    deleteEstudianteById,
    getAllEstudiantes,
} = require('../controllers/estudianteController');

const router = express.Router();


router.post('/estudiantes', createEstudiante);
router.get('/estudiantes', getAllEstudiantes);
router.get('/estudiantes/:id', getEstudianteById);
router.put('/estudiantes/:id', updateEstudianteById);
router.delete('/estudiantes/:id', deleteEstudianteById);


module.exports = router;