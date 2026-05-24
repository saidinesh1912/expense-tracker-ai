const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const {
  signup,
  login,
} = require("../controllers/authController");

const Expense =
  require("../models/Expense");

const User =
  require("../models/User");

const upload =
  require("../middleware/upload");


// SIGNUP
router.post(
  "/signup",
  signup
);


// LOGIN
router.post(
  "/login",
  login
);


// GOOGLE LOGIN
router.post(

  "/google-login",

  async (req, res) => {

    try {

      const {
        email,
        name,
      } = req.body;

      if (!email) {

        return res
          .status(400)
          .json({

            message:
              "Email required",

          });

      }

      let user =
        await User.findOne({

          email,

        });

      // CREATE USER IF NOT EXISTS

      if (!user) {

        user =
          await User.create({

            name:
              name ||
              email.split("@")[0],

            email,

            password:
              "google-auth-user",

          });

      }

      // JWT TOKEN

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

      res.status(200).json({

        token,

        email:
          user.email,

        message:
          "Google Login Success",

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);


// UPLOAD PROFILE PICTURE
router.post(

  "/upload-profile-pic",

  upload.single("image"),

  async (req, res) => {

    try {

      const { email } =
        req.body;

      const imageUrl =
        req.file.path;

      let user =
        await User.findOne({

          email,

        });

      // CREATE USER IF NOT EXISTS

      if (!user) {

        user =
          await User.create({

            name:
              email.split("@")[0],

            email,

            password:
              "google-auth-user",

            profilePic:
              imageUrl,

          });

      }

      else {

        user.profilePic =
          imageUrl;

        await user.save();

      }

      res.status(200).json({

        message:
          "Profile picture uploaded successfully",

        profilePic:
          user.profilePic,

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);


// REMOVE PROFILE PIC
router.put(

  "/remove-profile-pic",

  async (req, res) => {

    try {

      const { email } =
        req.body;

      const user =
        await User.findOne({

          email,

        });

      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "User not found",

          });

      }

      user.profilePic =
        "";

      await user.save();

      res.status(200).json({

        message:
          "Profile picture removed successfully",

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);


// DELETE ACCOUNT
router.delete(

  "/delete-account",

  async (req, res) => {

    try {

      const { email } =
        req.body;

      await Expense.deleteMany({

        userEmail:
          email,

      });

      await User.deleteOne({

        email,

      });

      res.status(200).json({

        message:
          "Account deleted successfully",

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  }

);

module.exports =
  router;