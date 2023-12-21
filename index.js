require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/config/db.js");
const { loadDataToDatabase } = require("./src/config/dataLoader.js");
const { PORT } = process.env;

(async () => {
  try {
    await conn.sync({ force: true });
    console.log("Database schema synchronized.");

    await loadDataToDatabase();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}.`);
    });
  } catch (error) {
    console.error(error);
  }
})();
