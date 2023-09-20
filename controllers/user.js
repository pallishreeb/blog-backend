const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");


//SEND GRID
const sendMail = require("../utils/sendMail");

//Models
const User = require("../models/userModel");
const Notification = require("../models/notification")
const SavedPost = require("../models/saved")
const Comment = require("../models/commentModel")

//Config
const keys = require("../config/keys");
const generateNextUserId = require("../utils/generateIds")

module.exports = {
  userRegister: async (req, res) => {
    try {
      let errors = {};
      const { name, email, password, phoneNumber } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 8);

      //GENERATE OTP
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const body = `Hi Here is OTP ${OTP} for email verification`;
      //generate unique Id for user
      generateNextUserId('user')
        .then(async (nextUserId) => {
          console.log(`Next User ID: ${nextUserId}`);
          const newUser = await new User({
            name,
            userId: nextUserId,
            email,
            password: hashedPassword,
            phoneNumber,
            otp: OTP,
            isEmailVerified: false,
          });
          await newUser.save();
          //SEND MAIL TO USER FOR EMAIL VERIFICATION
          await sendMail(email, "EMail verification", body);
          //remove otp after 2 min
          setTimeout(async () => {
            newUser.otp = -1
            await newUser.save()
          }, 200000)
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      res.status(200).json({
        message: "User registerd successfully, kindly verify your mail",
        success: true,
        response: {},
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const { email, verificationCode } = req.body;
      const user = await User.findOne({ email });
      // console.log(user)
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Email does not exist" });
      }
      if (user.otp !== verificationCode) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid verification code" });
      }
      user.otp = -1;
      user.isEmailVerified = true;
      user.active = true;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Email verified successfully.Please Login" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  userLogin: async (req, res) => {
    try {
      let errors = {};
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        errors.message = "Email doesnt not exist";
        return res.status(400).json(errors);
      }
      if (!user.isEmailVerified) {
        errors.message = "Email is not verified please verify your email";
        return res.status(400).json(errors);
      }
      if (!user.active) {
        errors.message = "Your account is deactivated or Block.Please contact Admin.";
        return res.status(400).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        errors.message = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const { _id, name, phoneNumber } = user;
      const payload = {
        _id,
        name,
        phoneNumber,
        email,
      };
      jwt.sign(payload, keys.secretKey, { expiresIn: "7d" }, (err, token) => {
        if (err) {
          console.log(err, "err in jwt sign");
        }
        res.json({
          message: "User logged in successfully",
          success: true,
          token: "Bearer " + token,
        });
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: `Error in userLogin ${err.message}` });
    }
  },
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res
          .status(200)
          .json({ success: false, message: "Email is required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found with given email" });
      }
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const body = `Hi Here is OTP ${OTP} for blog application`;
      const emailReq = {
        email: email,
        subject: "OTP Verification",
        body: body,
      };
      console.log("OTP", OTP)
      await sendMail(emailReq.email, emailReq.subject, emailReq.body);

      user.otp = Number(OTP);
      await user.save();
      console.log(user)
      //remove otp after 2 min
      setTimeout(async () => {
        user.otp = -1
        await user.save()
      }, 200000)
      return res.status(200).json({
        success: true,
        message: `OTP has been sent to email, it will be only valid for 2 minutes`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      if (!newPassword || !otp || !email) {
        return res
          .status(404)
          .json({ success: false, message: "Fields are empty" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found with given email" });
      }
      if (user.otp === -1) {
        return res
          .status(400)
          .json({ success: false, message: "Given OTP is expired" });
      }
      if (user.otp !== Number(otp)) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
      let hashedPassword;
      hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.otp = -1;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password has been change successfully",
        response: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(ObjectId(_id));
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found", response: {} });
      }

      let userRes = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        phoneNumber: user.phoneNumber,
        notificationCount: user.notificationCount
      }
      return res
        .status(200)
        .json({ success: true, message: "User found", response: userRes });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const { name, phoneNumber, password, newPassword } = req.body;
      const user = await User.findById(ObjectId(_id));
      if (name) {
        user.name = name;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (password) {
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
          errors.message = "Invalid Credentials";
          return res.status(404).json({ message: "Invalid Credentials" });
        }
        let hashedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashedPassword;
      }

      await user.save();

      let userRes = {
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        phoneNumber: user.phoneNumber
      }
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        response: userRes,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  allUser: async (_, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        return res
          .status(404)
          .json({ success: false, message: "No data found", response: {} });
      }
      return res
        .status(200)
        .json({ success: true, message: "Users found", response: users });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let userId = req.query.userId
      const user = await User.findByIdAndRemove({ _id: ObjectId(userId) });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "No User found with this id", response: {} });
      }
      // Delete user's notifications
      await Notification.deleteMany({ postedTo: ObjectId(userId) });
      await Notification.deleteMany({ createdBy: ObjectId(userId) });
      // Delete user's saved posts
      await SavedPost.deleteMany({ userId: ObjectId(userId) });

      //delete all the comments made by user
      await Comment.deleteMany({ createdBy: ObjectId(userId) })

      return res
        .status(200)
        .json({ success: true, message: "User deleted", response: user });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deactiveOrBlockUser: async (req, res) => {
    try {
      const userId = req.query.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Set the user's 'active' field to false
      user.active = false;

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  activeOrUnblockUser: async (req, res) => {
    try {
      const userId = req.query.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Set the user's 'active' field to true
      user.active = true;

      // Save the updated user
      await user.save();

      res.status(200).json({ message: 'User activated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
