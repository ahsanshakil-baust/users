// Dot Env
const dotenv = require("dotenv");
dotenv.config();

// module scaffolding
const environment = {};

// Production Mode
environment.production = {
    envName: "production",
    port: process.env.PORT || 5000,
    url: process.env.LOCALHOST,
    cookie: process.env.COOKIE_SECRET,
    token: process.env.JWT_SECRET,
    cookie_name: process.env.COOKIE_NAME,
};

// Development Mode
environment.development = {
    envName: "development",
    port: process.env.PORT || 6000,
};

// Checking which environment should be use
environment.checkEnvironmentName =
    typeof process.env.NODE_ENV === "string" ?
    process.env.NODE_ENV :
    "production";

// Selecting Mode Object
environment.environmentObject =
    typeof environment[environment.checkEnvironmentName.trim()] === "object" ?
    environment[environment.checkEnvironmentName.trim()] :
    environment["production"];

// exporting Module
module.exports = environment.environmentObject;