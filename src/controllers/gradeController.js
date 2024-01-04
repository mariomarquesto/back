const { Grade } = require('../config/db');



//* Crea Grado POST 
//! Validacion ok
const newgrade = async (req ,res) => { 
    try {

       const gradonew = await Grade.create(req.body);
        return res.status(200).json(gradonew)
                
    } catch (error) {
        console.log(error);
        return res.status(500).json(`Error creating grade ${gradename}`);    
    }
    
}

//* Todos Grados  GET
const allgrades = async (req ,res) =>{
    console.log("paso por todos los grados")
    try {
            const grades = await Grade.findAll({ 
                where: { state: true }, 
                attributes: { exclude: ['createdAt', 'updatedAt'] }
             });
         if (!grades) return res.status(404).json({error:"Grade is no exist"});
             return res.status(200).json(grades)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" })
    }
};



//* Buscar Grado por ID   GET
const findGradesId = async (req ,res)=>{
    const {id}=req.params;
    try {
            const grade=await Grade.findByPk(id);    
            if(!grade || !grade.state){
                return res.status(404).json({error: "The grade does not exist"})
            }
            return res.status(200).json(grade)
                
        } catch(error){
                console.log(error)
                return res.status(500).json({ error: "Internal Server Error" })
        }
}


//* Actualizar Grado PUT
const updateGrades = async (req ,res)=>{
    const {id}= req.params;
    const {gradename, gradequota, state} = req.body;
   
    try {
        //Buscamos el grado a modificar
        const gradeExist = await Grade.findByPk(id);  
        if(!gradeExist || !gradeExist.state){    
            return res.status(404).json({error:'The grade does not exist'})    
            } 
                const newgrade = await Grade.update(
                req.body , {where: { id } })
                return res.status(200).json(newgrade)
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
}

//* Eliminar Grado Delete 
const deleteGrade = async (req ,res)=>{
    const {id} = req.params;
    try{
        const grade = await Grade.findByPk(id);
        if (!grade || !grade.state) {
                return res.status(404).json({error:"The subject could not be deleted"});
            }else{
                await Grade.update(
                    { state: false },
                    { where: { id } }
                );
            return res.status(200).json({msg:`The subject has been correctly deleted with id=${id}`})
            }
    }catch(error){
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
  

module.exports = {
    newgrade, 
    allgrades, 
    findGradesId, 
    updateGrades, 
    deleteGrade, 
}

