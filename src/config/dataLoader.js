const fs = require("fs");
const path = require("path");

async function loadDataToDatabase() {
  const userData = fs.readFileSync(path.join(__dirname, "usersData.json"));
  const parentsData = fs.readFileSync(
    path.join(__dirname, "parentsData.json"),
    "utf8"
  );
  const studentsData = fs.readFileSync(
    path.join(__dirname, "studentsData.json"),
    "utf8"
  );

  // const User = sequelize.models.User;
  // const Parents = sequelize.models.Parents;
  // const Estudiante = sequelize.models.Estudiante;

  const users = JSON.parse(userData);
  const parents = JSON.parse(parentsData);
  const students = JSON.parse(studentsData);

  for (const userData of users) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { id: userData.id },
        defaults: userData,
      });

      console.log(
        created ? "Usuario creado:" : "Usuario encontrado:",
        user.toJSON()
      );

      const parentRelated = parents.filter(
        (parent) => parent.userId === userData.id
      );

      for (const parentData of parentRelated) {
        try {
          const [parent, created] = await Parents.findOrCreate({
            where: { id: parentData.id },
            defaults: parentData,
          });

          console.log(
            created ? "Padre creado:" : "Padre encontrado:",
            parent.toJSON()
          );

          await user.addParents(parent);
          console.log("Padre asociado al usuario:", parent.id);

          // Encontrar estudiantes relacionados con este padre
          const studentsRelatedToParent = students.filter(
            (student) => student.parentId === parent.id
          );

          for (const studentData of studentsRelatedToParent) {
            try {
              const [student, studentCreated] = await Estudiante.findOrCreate({
                where: { id: studentData.id },
                defaults: studentData,
              });

              console.log(
                studentCreated
                  ? "Estudiante creado:"
                  : "Estudiante encontrado:",
                student.toJSON()
              );

              await parent.addEstudiante(student);
              console.log("Estudiante asociado al padre:", student.id);
            } catch (error) {
              console.error("Error al cargar estudiante:", error);
            }
          }
        } catch (error) {
          console.error("Error al cargar padre:", error);
        }
      }
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = {
  loadDataToDatabase,
};
