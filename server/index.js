//import section
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./configs/db.config");

//declaration section
const port = process.env.PORT || 3000;
const app = express();

//middleware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route endpoints

/* 
GET /
   
*/
app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
