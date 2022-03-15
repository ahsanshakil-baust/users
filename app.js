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
// app.use(express.static(path.join(__dirname, "public")));

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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
}

// connection log
app.listen(environment.port, () => {
    console.log(
        `Server running on ${environment.port} on mode ${environment.envName}`
    );
});
