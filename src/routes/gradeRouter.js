
const { Router} = require ("express")
//importando o router do express
const {gradeValidate} = require ("../middleware/newrgadevalidaton")


const {
    newgrade, 
    allgrades, 
    findGradesId, 
    updateGrades, 
    deleteGrade, 
    
} = require ("../controllers/gradeController")
//creamos el router para las rutas de grados
const router=Router()

router.post("/grade", gradeValidate, newgrade) //agregar un nuevo grado a la base de datos //! OK Validacion
router.get('/grade', allgrades)   //mostrar todos los grados en la base de datos //! OK Excluye los datos de creacion 
router.get('/grade/:id', findGradesId)   //busca los grados por Id en la base de datos //! OK busca por Id UUIU
router.put ('/grade/:id', updateGrades) //actualizar informacion de un grado //! OK Actualiza por ID 
router.put ('/gradedel/:id', deleteGrade ) // elimina de forma logica el grado 
module.exports=router;
