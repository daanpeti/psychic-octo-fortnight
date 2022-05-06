//import section
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./configs/db.config");
const User = require("./models/user.model");

//declaration section
const port = process.env.PORT || 3000;
const app = express();

//middleware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route endpoints

/**
 * GET @/
 */

app.get("/", (req, res) => {
  res.send("Hello from express");
});

/**
 * POST @/register
 */

app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, details } = req.body;
  if (!(first_name && last_name, email, password)) {
    return res.status(400).json({ message: "All field required" });
  }
  //check for existing user
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).json({ message: "User Already exists" });
  } else {
    //TODO : encrypt password
    const user = new User({
      first_name,
      last_name,
      email,
      password,
      details,
    });
    try {
      user.save();
      res
        .status(200)
        .json({ message: "User created successfully", id: user.email });
    } catch (e) {
      res.status(400).json({ message: "Some unexpected error happened." });
    }
  }
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
