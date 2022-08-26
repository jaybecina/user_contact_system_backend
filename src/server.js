const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/ErrorMiddleware");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
// const multer = require("multer"); // v1.0.5
// const upload = multer(); // for parsing multipart/form-data

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/users", require("./routes/UserRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: ${port}`));
