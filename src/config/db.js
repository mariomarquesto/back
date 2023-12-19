require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/usertest`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { User, Parents, Estudiante, Grade } = sequelize.models;

User.belongsToMany(Parents, { through: "userParent" });
Parents.belongsToMany(User, { through: "userParent" });

Parents.belongsToMany(Estudiante, { through: "parentEstudiante" });
Estudiante.belongsToMany(Parents, { through: "parentEstudiante" });

//Parents.belongsToMany(estudiante, { through: "parentEstudiante", as: "estudiantes", foreignKey: "userId" })
//estudiante.belongsToMany(Parents, { through: "parentEstudiante", as: "parents", foreignKey: "estudianteId" })

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

  const User = sequelize.models.User;
  const Parents = sequelize.models.Parents;
  const Estudiante = sequelize.models.Estudiante;

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
              const [student, studentCreated] = await Estudiante.findOrCreate({
                where: { id: studentData.id },
                defaults: studentData,
              });
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
}
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  loadDataToDatabase,
};
