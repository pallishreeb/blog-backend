const express = require("express");
const app = express();
const config = require("./config/config")
const cors = require('cors')
const hpp = require("hpp");
const helmet = require("helmet");
const passport = require("passport");
const morgan = require("morgan");
const connectDb = require("./config/dbConfig")

// Configure CORS to allow requests from any origin
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and sessions
};

app.use(cors(corsOptions));
//middlewares enable
app.use(hpp());  // HTTP parameter pollution (HPP)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//No clickjacking protection configured
app.use(helmet.frameguard());

//Prevent mime sniffing
app.use(helmet.noSniff());

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
require("./config/passport")(passport);

//connect to DB
connectDb()

//Swagger endpoint
app.use("/docs", require("./swagger/swaggerRoute"));

//api routes
app.use("/dev/api/v1/user", require("./routes/user"));
app.use("/dev/api/v1/post", require("./routes/post"));
app.use("/dev/api/v1/category", require("./routes/category"));
app.use("/dev/api/v1/comment", require("./routes/comment"));
app.use("/dev/api/v1/notification", require("./routes/notification"));
app.use("/dev/api/v1/metadata", require("./routes/metadata"));

//Catch 404 error
app.use((req, _, next) => {
    const error = new Error(`Unsupported Route.- ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

//Error handler functions
app.use((error, _, res, next) => {
    res.status(error.status || 500);
    console.log(error)
    res.json({
        error: {
            message: error.message || "Something went wrong in Server",
        },
    });
    next()
});



//listen to server
const PORT = config.PORT || 8000;

module.exports = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Handle unhandled promise rejection
//const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// process.on('unhandledRejection',(err,promise) => {
//     console.log(`Error : ${err.message}`);
//     //close server and exit process
//     server.close(() => process.exit(1))
// })