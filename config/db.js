const mongoose = require("mongoose");

// Use environment variable for MongoDB URI
const { MONGO_CONNECTION_URI } = process.env;

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(MONGO_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDb;
