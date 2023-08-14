let User = require("../../../models/user");
let jwt = require("jsonwebtoken");

// Generates JSON web token on Login attempt
module.exports.createSession = async function (req, res) {
  try {
    // If phone or password is missing
    if (!req.body.phone || !req.body.password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    // Stores users credentials from the request object
    let user = {
      phone: req.body.phone,
      password: req.body.password,
    };

    // Finds user with provided phone in the data base
    let userData = await User.findOne({ phone: user.phone });
    // No user found associated with phone
    if (!userData) {
      return res.status(404).json({
        message: "No user Found.Register to begin",
      });
    }
    // Validate passwords
    if (user.password != userData.password) {
      console.log("No match");

      return res.status(401).json({
        message: "Incorrect phone number or password",
      });
    }
    // Identity established . returns the JWT
    userData = await userData.toJSON();
    user = { id: userData._id, name: userData.name, phone: userData.phone };
    const token = jwt.sign({ ...user, iat: Date.now() }, `test`, {
      expiresIn: 86400000,
      //   expiresIn: 5000,
    });
    console.log(token);
    return res.status(200).json({
      message: "Sign in successful.Token is attached",
      data: {
        token: token,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Register a new User
module.exports.register = async function (req, res) {
  try {
    console.log(req.body);
    if (!req.body.phone || !req.body.password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    let name = req.body.name === "" ? undefined : req.body.name;

    let newUser = {
      phone: req.body.phone,
      name: name,
      password: req.body.password,
    };
    // Validates if user with requested phone already exsists
    let user = await User.findOne({ phone: newUser.phone });
    if (user) {
      return res.status(409).json({
        message: "User already registered",
      });
    }
    // Creates new user
    user = await User.create(newUser);
    return res.status(200).json({
      message: "User Succesfully Registered",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Fetch all users
module.exports.getAll = async function (req, res) {
  let allUsers = await User.find();
  return res.status(200).json({
    data: { allUsers },
  });
};
