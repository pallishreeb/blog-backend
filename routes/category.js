const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
  createCategory, getAllCategory, getAllSubCategory, getSubCategoryForCategory, deleteCategory, deleteSubCategory,
  createSubCategory, updateCategory, updateSubCategory
} = require("../controllers/category");

//isAdmin
const isAdmin = require("../middleware/auth")

//CREATE POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createCategory
);

router.post(
  "/add/subcategory",
  passport.authenticate("jwt", { session: false }),
  createSubCategory
);
//GET categories
router.get(
  "/",
  getAllCategory
);

//GET subcategories
router.get("/subs", passport.authenticate("jwt", { session: false }), getAllSubCategory);

//GET subcategories for category
router.get("/subs/category", passport.authenticate("jwt", { session: false }), getSubCategoryForCategory);


//UPDATE category
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  updateCategory
);

//UPDATE subcategory
router.put(
  "/sub/edit",
  passport.authenticate("jwt", { session: false }),
  updateSubCategory
);

//DELETE category
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);

//DELETE subcategory
router.delete(
  "/sub/delete",
  passport.authenticate("jwt", { session: false }),
  deleteSubCategory
);


module.exports = router;