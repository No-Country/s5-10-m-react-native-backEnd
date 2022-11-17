const app = require('./app.js');
const sequelize = require('./database/database.js');

// models
require('./models/indexModels.js')

const Main = async () => {
  try {
    // connecting database
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    // connecting server   
    app.listen(app.get("PORT"));
    console.log(`Server listening on port ${app.get("PORT")}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

Main();