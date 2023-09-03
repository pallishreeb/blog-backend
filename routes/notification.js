const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
 getNotification, postNotification, deleteNotification
} = require("../controllers/notification");

//CREATE Notification
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),

  postNotification
);

//GET Notification
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getNotification
);

//DELETE Notification
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteNotification
);


module.exports = router;