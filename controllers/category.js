const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const { ObjectId } = require("mongodb");

module.exports = {
  //category
  getAllCategory: async (_, res) => {
    try {
      const category = await Category.find({}).sort({ createdAt: -1 }).exec();
      return res.status(200).json({
        success: true,
        message: `${category.length} Category found`,
        response: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { category } = req.body;
      const isExist = await Category.findOne({ categoryName: category });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newCategory = await new Category({
        categoryName: category,
      });
      await newCategory.save();
      return res.status(200).json({
        success: false,
        message: "Created successfully",
        response: newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const category = await Category.findByIdAndDelete({_id: ObjectId(categoryId)});
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      await SubCategory.deleteMany({categoryId:  ObjectId(categoryId)})
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    console.log("body", req.body);
    try {
      const { categoryId, categoryName } = req.body;
    
      const category = await Category.findById({_id:ObjectId(categoryId)});
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
      if (categoryName) {
        category.categoryName = categoryName;
      }
      await category.save();
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  //subactegory

  getAllSubCategory: async (_, res) => {
    try {
      const subcategory = await SubCategory.find({}).populate("categoryId")
      // sort({ createdAt: -1 }).exec().
      return res.status(200).json({
        success: true,
        message: `${subcategory.length} Sub Category found`,
        response: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  createSubCategory: async (req, res) => {
    try {
      const { subcategory, categoryId } = req.body;
      const isExist = await SubCategory.findOne({
        subcategoryName: subcategory,
      });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newSubCategory = await new SubCategory({
        subcategoryName: subcategory,
        categoryId,
      });
      await newSubCategory.save();
      return res.status(200).json({
        success: true,
        message: "Created successfully",
        response: newSubCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteSubCategory: async (req, res) => {
    try {
      const { subId } = req.query;
      const subcategory = await SubCategory.findByIdAndDelete({_id: ObjectId(subId)});
      if (!subcategory) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      return res.status(200).json({
        success: true,
        message: "SubCategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getSubCategoryForCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const subcategory = await SubCategory.find({ categoryId });
      return res.status(200).json({
        success: true,
        message: `${subcategory.length} Sub Category found`,
        response: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updateSubCategory: async (req, res) => {
    try {
      const { categoryId, subcategoryName, subId } = req.body;
      const subcategory = await SubCategory.findById({ _id: ObjectId(subId) });
      if (!subcategory) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
      if (subcategoryName) {
        subcategory.subcategoryName = subcategoryName;
      }
      if (categoryId) {
        subcategory.categoryId = categoryId;
      }
      await subcategory.save();
      return res.status(200).json({
        success: true,
        message: "SubCategory updated successfully",
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
