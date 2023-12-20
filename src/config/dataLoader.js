const fs = require("fs");
const path = require("path");
const db = require("../config/db");

const loadDataToDatabase = async () => {
  try {
    // Leer archivos JSON
    const userData = fs.readFileSync(path.join(__dirname, "usersData.json"));
    const parentsData = fs.readFileSync(
      path.join(__dirname, "parentsData.json"),
      "utf8"
    );
    const studentsData = fs.readFileSync(
      path.join(__dirname, "studentsData.json"),
      "utf8"
    );
    const User = db.User;
    const Parents = db.Parents;
    const Estudiante = db.Estudiante;

    const users = JSON.parse(userData);
    const parents = JSON.parse(parentsData);
    const students = JSON.parse(studentsData);

    for (const userData of users) {
      try {
        const [user, created] = await User.findOrCreate({
          where: { id: userData.id },
          defaults: userData,
        });

        const parentRelated = parents.filter(
          (parent) => parent.userId === userData.id
        );

        for (const parentData of parentRelated) {
          try {
            const [parent, created] = await Parents.findOrCreate({
              where: { id: parentData.id },
              defaults: parentData,
            });
            await user.addParents(parent);

            // Encontrar estudiantes relacionados con este padre
            const studentsRelatedToParent = students.filter(
              (student) => student.parentId === parent.id
            );

            for (const studentData of studentsRelatedToParent) {
              try {
                const [student, studentCreated] = await Estudiante.findOrCreate(
                  {
                    where: { id: studentData.id },
                    defaults: studentData,
                  }
                );
                await parent.addEstudiante(student);
              } catch (error) {
                return { error: error.message };
              }
            }
          } catch (error) {
            return { error: error.message };
          }
        }
      } catch (error) {
        return { error: error.message };
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  loadDataToDatabase,
};
