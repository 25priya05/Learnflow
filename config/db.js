const mongoose = require("mongoose");


const connectDb = async () => {
    try {
       const conn = await mongoose.connect(
           "mongodb+srv://priyanka_kumari:pranav123@atlascluster.0qxd74u.mongodb.net/Learnflow?retryWrites=true&w=majority",
           {
               useNewUrlParser: true,
               useUnifiedTopology: true,
           }
       );
       console.log(`MongoDB Connected ${conn.connection.host}`);
        }
    catch (error) {
        console.log(error);
        process.exit();
        }

};

module.exports = connectDb;