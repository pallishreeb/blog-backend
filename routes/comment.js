const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  commentOnPost,
  getCommentsOnPost,
  deleteComment,
  updateComment
} = require("../controllers/comment");
const {
  deleteReply,
  repliesOnComment,
  getrepliesOnComment,
  updateReply
} = require("../controllers/reply");

//COMMENT ON POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  commentOnPost
);

//GET COMMENT ON POST
router.get(
  "/allcomments",
  getCommentsOnPost
);

//update comment
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  updateComment
);

//DELETE COMMENT
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

//Reply ON Comment
router.post(
  "/reply",
  passport.authenticate("jwt", { session: false }),
  repliesOnComment
);

//GET replies on a comment
router.get(
  "/replies",
  getrepliesOnComment
);

//update reply
router.put(
  "/reply/edit",
  passport.authenticate("jwt", { session: false }),
  updateReply
);

//DELETE reply
router.delete(
  "/reply/delete",
  passport.authenticate("jwt", { session: false }),
  deleteReply
);



module.exports = router;