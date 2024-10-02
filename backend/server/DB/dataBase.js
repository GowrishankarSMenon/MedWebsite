const mongoose = require("mongoose");


const dataBase = async () => {
  try {
    const base = await mongoose.connect("mongodb://localhost:27017/medApp")
    console.log("connected to port", base.connection.port)
  } catch (error) {
    console.error("Database connection failed. Exiting now...");
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}




module.exports = dataBase;