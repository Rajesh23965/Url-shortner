const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth.js");
const User = require("../Models/user.js");

async function handleSignupUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ err: "All fields are required" });
  }

  try {
    const userInfo = await User.create({ name, email, password });
    return res.redirect("/");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ err: "Email already exists" });
    }
    return res.status(500).json({ err: "Internal server error" });
  }
}

//function to login

async function handleLogInUser(req, res) {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.render("Login", { err: "Invalid Username and Password" });
    }
    // const sessionId = uuidv4();
    const token=setUser(user);
    res.cookie("token", token);
    return res.redirect("/")

    // return res.redirect("/");
  } catch (error) {
    return res.status(500).json({ err: "Internal Server error", error });
  }
}

module.exports = {
  handleLogInUser,
  handleSignupUser,
};
