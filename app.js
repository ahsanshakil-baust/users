// external imports
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// intenal imports
const environment = require("./helpers/environment");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");

// database connection
mongoose
    .connect(environment.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err.message));

const app = express();

// set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser(environment.cookie));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// user
app.use("/user", userRouter);

//admin
app.use("/admin", adminRouter);

// notFoundHandler
app.use(notFoundHandler);

// errorHandler
app.use(errorHandler);

// step heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
}

// connection log
app.listen(environment.port || 5000, () => {
    console.log(
        `Server running on ${environment.port} on mode ${environment.envName}`
    );
});
