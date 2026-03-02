const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB: playarena");
  } catch (err) {
    console.error(" Connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
