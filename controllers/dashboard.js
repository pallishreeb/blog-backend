const Post = require("../models/postModel");
const User = require("../models/userModel");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

exports.getStatitics = async(req,res) =>{
    try {
        const userCount = await User.countDocuments();
        const postCount = await Post.countDocuments();
        const categoryCount = await Category.countDocuments();
        const subcategoryCount = await SubCategory.countDocuments();
    
        const statistics = {
          users: userCount,
          posts: postCount,
          categories: categoryCount,
          subcategories: subcategoryCount,
        };
    
        res.json(statistics);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}