const Reply = require("../models/replyModel");
const Notification = require("../models/notification")
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");

module.exports = {
  //get reply on  a comment
  // /comment?commentId=233&page=1&pageSize=8
  getrepliesOnComment: async (req, res) => {
    try {
      const { commentId } = req.query;
      const replies = await Reply.find({ commentId })
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name _id');
      return res
        .status(200)
        .json({
          success: true,
          message: `${replies.length} replies on given comment`,
          response: replies,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },

  //do reply on a comment
  repliesOnComment: async (req, res) => {
    try {
      let newNotification;
      const { _id } = req.user;
      const { commentId, reply, postId } = req.body;

      const comment = await Comment.findById({ _id: ObjectId(commentId) }).populate('createdBy');

      const user = await User.findById({ _id: ObjectId(comment.createdBy._id) });
      const newReply = await new Reply({
        reply,
        commentId,
        createdBy: _id,
      });
      await newReply.save();

      if (comment.createdBy._id.toString() !== _id.toString()) {
        newNotification = await new Notification({
          commentId,
          replyId: newReply._id,
          postId,
          createdBy: _id,
          postedTo: comment.createdBy._id
        });
        await newNotification.save()
      }

      user.notificationCount = user.notificationCount + 1;
      await user.save()


      const replyToReturn = await Reply.findById(newReply._id)
        .sort({ createdAt: -1 }).populate('createdBy');

      return res
        .status(200)
        .json({
          success: true,
          message: "Repied successfully",
          response: replyToReturn,
          notification: newNotification
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  //delete a reply
  deleteReply: async (req, res) => {
    try {
      const { replyId } = req.query;

      const reply = await Reply.findByIdAndDelete({ _id: ObjectId(replyId) });
      if (!reply) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }

      await Notification.remove({ replyId: ObjectId(replyId) })

      return res
        .status(200)
        .json({
          success: true,
          message: "Comment deleted successfully",
          response: reply,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },

  updateReply: async (req, res) => {
    try {
      const { replyId, replyText } = req.body;

      const reply = await Reply.findById({ _id: ObjectId(replyId) });

      if (!reply) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, Replied comment not found",
          response: {},
        });
      }
      if (reply.createdBy.toString() != req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to edit this comment",
          response: {},
        });
      }

      if (replyText) {
        reply.reply = replyText;
      }
      await reply.save();
      return res.status(200).json({
        success: true,
        message: "Replied Comment updated successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};