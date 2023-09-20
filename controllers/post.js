const { ObjectId } = require("mongodb");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel")
const Saved = require("../models/saved")
const Notification = require("../models/notification")
// const Reply = require("../models/replyModel")



module.exports = {
  createPost: async (req, res) => {
    try {
      const { _id } = req.user;
      const { title, text, websitesLink, brand, youtubeLink, model, categoryId, subcategoryId, images } = req.body;
      const post = await new Post({
        title,
        text,
        images,
        // docs,
        category: categoryId,
        subcategory: subcategoryId,
        brand,
        model,
        websitesLink,
        youtubeLink,
        createdBy: _id,
      });
      await post.save();
      // console.log("post created-----",post);
      return res
        .status(200)
        .json({
          success: true,
          message: "Post created successfully",
          response: post,
        });
    } catch (error) {
      console.log("Error", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  getPost: async (req, res) => {
    try {
      const { postId } = req.query;
      let id = postId
      const post = await Post.findById(id).populate("category").populate("subcategory");
      const relatedPosts = await Post.find({ category: ObjectId(post.category) })
      post.views = post.views + 1;
      post.save()
      if (!post) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, post not found",
            response: {},
          });
      }
      return res
        .status(200)
        .json({ success: true, message: "Post found", response: post, relatedPosts });
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
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("category")
        .populate("subcategory");
      return res
        .status(200)
        .json({
          success: true,
          message: `${posts.length} found`,
          response: posts,
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
  updatePost: async (req, res) => {
    try {
      const { postId } = req.query;
      // console.log("data", req.body);

      // let images = [];
      // let docs = [];
      // if (req.files.images.length > 0) {
      //   for (const element of req.files.images) {
      //     let url = s3.getSignedUrl("getObject", {
      //       Bucket: process.env.AWS_BUCKET_NAME,
      //       Key: element.key,
      //     });
      //     images.push({
      //       id: uuidv4(),
      //       originalname: element.originalname,
      //       url: url,
      //     });
      //   }
      // }
      // if (req.files.docs.length > 0) {
      //   for (const element of req.files.docs) {
      //     let url = s3.getSignedUrl("getObject", {
      //       Bucket: process.env.AWS_BUCKET_NAME,
      //       Key: element.key,
      //     });
      //     docs.push({
      //       id: uuidv4(),
      //       originalname: element.originalname,
      //       url: url,
      //     });
      //   }
      // }
      const { title, text, websitesLink, brand, youtubeLink, model, categoryId, subcategoryId, images } = req.body;
      const post = await Post.findById({ _id: ObjectId(postId) });
      console.log("post info", post);
      if (!post) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, post not found",
            response: {},
          });
      }
      if (title) {
        post.title = title;
      }
      if (text) {
        post.text = text;
      }
      if (images.length > 0) {
        post.images = images;
      }
      // if (docs.length > 0) {
      //   post.docs = docs;
      // }
      if (websitesLink) {
        post.websitesLink = websitesLink;
      }
      if (brand) {
        post.brand = brand;
      }
      if (youtubeLink) {
        post.youtubeLink = youtubeLink;
      }
      if (model) {
        post.model = model;
      }
      if (categoryId) {
        post.category = categoryId;
      }
      if (subcategoryId) {
        post.subcategory = subcategoryId;
      }
      await post.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Post updated successfully",
          response: post,
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
  deletePost: async (req, res) => {
    try {
      const { postId } = req.query;

      const post = await Post.findByIdAndDelete({ _id: ObjectId(postId) });
      if (!post) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, post not found",
            response: {},
          });
      }

      //delete all the comments for the post
      await Comment.deleteMany({ postId: ObjectId(postId) })

      //delete from user's saved post 
      await Saved.deleteMany({ postId: ObjectId(postId) });

      //delete all notification of that post
      await Notification.deleteMany({ postId: ObjectId(postId) })

      return res
        .status(200)
        .json({
          success: true,
          messsage: "Post Removed successfully",
          response: post,
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
  mostViewedPost: async (_, res) => {
    try {
      const viewedPosts = await Post.find({}).sort({ views: -1 }).limit(6)
      return res
        .status(200)
        .json({
          success: true,
          message: `${viewedPosts.length}  Post found`,
          response: viewedPosts,
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
  relatedPost: async (req, res) => {
    //most top 5 related posts similar to category , subcategory and title description
    try {
      const { postId } = req.query
      const post = await Post.findById({ _id: ObjectId(postId) });
      const relatedPosts = await Post.find({ category: ObjectId(post.category) })

      return res
        .status(200)
        .json({
          success: true,
          message: `${relatedPosts.length}  Post found`,
          response: relatedPosts,
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
  savePost: async (req, res) => {
    //save the post
    try {

      const { postId } = req.query;
      const isExist = await Saved.findOne({ postId: ObjectId(postId) });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "already exist",
          response: {},
        });
      }
      const newSave = await new Saved({
        postId,
        userId: req.user._id
      });
      await newSave.save();
      return res.status(200).json({
        success: false,
        message: "Saved successfully",
        response: newSave,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  filterByCategory: async (req, res) => {
    try {

      const { categoryId } = req.query;
      const posts = await Post.find({ category: ObjectId(categoryId) });
      return res.status(200).json({
        success: false,
        message: "Fetched successfully",
        response: posts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getAllSavedPostForUser: async (req, res) => {
    try {

      const { _id } = req.user
      const posts = await Saved.find({ userId: ObjectId(_id) }).populate("postId")
      console.log(posts)

      return res.status(200).json({
        success: false,
        message: "Fetched successfully",
        response: posts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  removeSavedPost: async (req, res) => {
    try {
      const { savedPostId } = req.query;
      const post = await Saved.findByIdAndDelete({ _id: ObjectId(savedPostId) });
      if (!post) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Invalid id, post not found",
            response: {},
          });
      }
      return res.status(200).json({
        success: false,
        message: "Removed successfully"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

};