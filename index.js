const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, "utils", ".env") });

const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname , "client", "build")));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname , "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
