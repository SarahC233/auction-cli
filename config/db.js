const mongoose = require("mongoose");

const connectDB = async (dbName) => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
    console.log(`MongoDB connected to ${dbName}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
