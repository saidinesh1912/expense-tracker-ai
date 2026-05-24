const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================

const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK EMPTY FIELDS

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        message:
          "All fields are required",

      });

    }

    // CHECK EXISTING USER

    const existingUser =
      await User.findOne({

        email,

      });

    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists",

      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER

    const user =
      await User.create({

        name,

        email,

        password:
          hashedPassword,

      });

    // CREATE TOKEN

    const token =
      jwt.sign(

        {

          id:
            user._id,

          email:
            user.email,

        },

        process.env.JWT_SECRET,

        {

          expiresIn:
            "7d",

        }

      );

    // RESPONSE

    res.status(201).json({

      message:
        "Signup successful",

      token,

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

      },

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};


// ================= LOGIN =================

const login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // FIND USER

    const user =
      await User.findOne({

        email,

      });

    if (!user) {

      return res.status(400).json({

        message:
          "Invalid credentials",

      });

    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(

        password,

        user.password

      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid credentials",

      });

    }

    // TOKEN

    const token =
      jwt.sign(

        {

          id:
            user._id,

          email:
            user.email,

        },

        process.env.JWT_SECRET,

        {

          expiresIn:
            "7d",

        }

      );

    // RESPONSE

    res.status(200).json({

      message:
        "Login successful",

      token,

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

      },

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,

    });

  }

};


module.exports = {

  signup,

  login,

};