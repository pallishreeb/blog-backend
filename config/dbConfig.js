const mongoose = require('mongoose')
const config = require("./config")


const connectDB = async () => {
    const conn = await mongoose.connect(config.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Mongodb connected : ${conn.connection.host}`)
}

module.exports = connectDB;