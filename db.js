const mongoose = require("mongoose");

async function connectToDb(mongoUri) {
  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    autoIndex: true
  });

  return mongoose.connection;
}

module.exports = { connectToDb };

