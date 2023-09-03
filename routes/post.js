const express = require("express");
const router = express.Router();
const passport = require("passport");
const { upload } = require("../utils/s3");

const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  mostViewedPost,
  relatedPost,
  savePost,
  filterByCategory,
  getAllSavedPostForUser,
  removeSavedPost,
} = require("../controllers/post");

//isAdmin middleware
const isAdmin = require("../middleware/auth")

//CREATE POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createPost
);

// upload.fields([
//   { name: "images", maxCount: 5 },
//   { name: "docs", maxCount: 5 },
// ]),
//GET POST
router.get(
  "/singlePost",
  getPost
);

//GET POSTS
router.get("/allPost", getPosts);
//mostviewdpost
router.get("/most-viewed", mostViewedPost);


//UPDATE POST
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "docs", maxCount: 5 },
  ]),
  updatePost
);

//DELETE POST
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deletePost
);


//related posts
router.get("/related-post",relatedPost);

//save posts
router.get("/save-post", passport.authenticate("jwt", { session: false }), savePost);

//filter by catergory posts
router.get("/filterByCategory",filterByCategory);

//get all the saved post for an user 
router.get("/savedpost", passport.authenticate("jwt", { session: false }), getAllSavedPostForUser);

//
router.delete("/remove-saved-post", passport.authenticate("jwt", { session: false }),
  removeSavedPost);

module.exports = router;