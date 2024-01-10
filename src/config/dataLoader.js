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

    const valoracionesData = fs.readFileSync(
      path.join(__dirname, "valoracionesData.json"),
      "utf8"
    );
    const gradeData = fs.readFileSync(
      path.join(__dirname, "gradeData.json"),
      "utf8"
    );
    const User = db.User;
    const Parents = db.Parents;
    const Estudiante = db.Estudiante;
    const Valoracion = db.Valoracion;
    const Grade = db.Grade;

    const users = JSON.parse(userData);
    const parents = JSON.parse(parentsData);
    const students = JSON.parse(studentsData);
    const valoraciones = JSON.parse(valoracionesData);
    const grades = JSON.parse(gradeData);

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

                const gradesRelatedToStudent = grades.filter(
                  (grade) => grade.studentId === student.id
                );

                for (const gradeData of gradesRelatedToStudent) {
                  try {
                    const [grade, gradeCreated] = await Grade.findOrCreate({
                      where: { id: gradeData.id },
                      defaults: gradeData,
                    });
                    await student.addGrade(grade);
                  } catch (error) {
                    console.error(
                      "Error creating or finding grade:",
                      error.message
                    );
                  }
                }
              } catch (error) {
                return { error: error.message };
              }
            }
            const valoracionesRelatedToParent = valoraciones.filter(
              (value) => value.parentId === parent.id
            );

            for (const valoracionData of valoracionesRelatedToParent) {
              try {
                const [valoracion, valoracionCreated] =
                  await Valoracion.findOrCreate({
                    where: { id: valoracionData.id },
                    defaults: valoracionData,
                  });
                await parent.addValoracion(valoracion);
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
    return { error: error.message };
  }
};

module.exports = {
  loadDataToDatabase,
};
