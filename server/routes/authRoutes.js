const express = require("express");

const router = express.Router();

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
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// UPLOAD PROFILE PICTURE
router.post(

  "/upload-profile-pic",

  upload.single("image"),

  async (req, res) => {

    try {

      const { email } = req.body;

      const imageUrl =
        req.file.path;

      // FIND USER
      let user =
        await User.findOne({
          email,
        });

      // CREATE GOOGLE USER
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

      } else {

        // UPDATE PROFILE PIC
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

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });
    }
  }
);

// REMOVE PROFILE PICTURE
router.put(

  "/remove-profile-pic",

  async (req, res) => {

    try {

      const { email } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",

        });
      }

      // REMOVE IMAGE
      user.profilePic = "";

      await user.save();

      res.status(200).json({

        message:
          "Profile picture removed successfully",

      });

    } catch (error) {

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

      const { email } = req.body;

      // DELETE USER EXPENSES
      await Expense.deleteMany({
        userEmail: email,
      });

      // DELETE USER
      await User.deleteOne({
        email,
      });

      res.status(200).json({

        message:
          "Account deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });
    }
  }
);

module.exports = router;