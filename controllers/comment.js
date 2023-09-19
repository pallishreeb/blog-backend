
const Comment = require("../models/commentModel");
const Reply = require("../models/replyModel");
const { ObjectId } = require("mongodb");


module.exports = {
  // /comment?postId=233&page=1&pageSize=8
  getCommentsOnPost: async (req, res) => {
    try {
      const { postId, page = 1, pageSize = 4 } = req.query;
      const comments = await Comment.find({ postId })
        .sort({ createdAt: -1 })
        .limit(Number(page * pageSize))
        .populate('createdBy', 'name _id');

      const totalComments = await Comment.find({ postId })
        .sort({ createdAt: -1 })
      return res
        .status(200)
        .json({
          success: true,
          message: `${comments.length} comments on given post`,
          response: comments,
          totalComments: totalComments?.length
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
  commentOnPost: async (req, res) => {
    try {
      const { _id } = req.user;
      const { postId, comment } = req.body;
      const newComment = await new Comment({
        comment,
        postId: postId,
        createdBy: _id,
      });
      await newComment.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Commented successfully",
          response: newComment,
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
  deleteComment: async (req, res) => {
    try {
      const { commentId } = req.query;
      const comment = await Comment.findByIdAndDelete({ _id: ObjectId(commentId) });


      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      //delete all the replies of that comment 
      await Reply.deleteMany({ commentId: ObjectId(commentId) })

      return res
        .status(200)
        .json({
          success: true,
          message: "Comment deleted successfully",
          response: comment,
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

  updateComment: async (req, res) => {
    try {
      const { commentId, commentText } = req.body;
      const comment = await Comment.findById({ _id: ObjectId(commentId) });
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, comment not found",
          response: {},
        });
      }
      if (comment.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You are not allowed to edit this comment",
          response: {},
        });
      }

      if (commentText) {
        comment.comment = commentText;
      }
      await comment.save();
      return res.status(200).json({
        success: true,
        message: "Comment updated successfully",
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