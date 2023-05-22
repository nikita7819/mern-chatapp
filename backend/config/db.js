const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected: ${conn.connection.host}`.bgCyan.blue.italic
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.bgRed);
  }
};

module.exports = connectDB;
