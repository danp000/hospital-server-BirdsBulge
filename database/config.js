const mongoose = require("mongoose");


const dbConnect = async () => {

  try {
    await mongoose.connect(
      process.env.DB_CNN,
      {
        useNewUrlParser: true,
      }
    );
    console.log(' < Database connected > ');

  } catch (er) {
    console.log(er);
    throw new Error("Error a la hora de coneccion a la base de datos");
  }
};


module.exports = {
  dbConnect
}
