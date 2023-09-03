//import devLoogger and prodLogger functions
const prodLogger = require("./prodLogger");
const config = require("../config/config");

let logger = null;

//if code is running on prod environment then call prodLogger()
if (config.deployment === "prod") {
    logger = prodLogger();
}

//export logger function
module.exports = logger;