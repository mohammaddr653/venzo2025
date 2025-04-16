const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Blog = require("../models/blog");

class BlogServices {
  async getAllBlogs(req, res) {
    //خواندن تمام مقالات از دیتابیس
    return Blog.find({});
  }
  async seeOneBlog(req, res) {
    // خواندن یک مقاله از دیتابیس
    return Blog.findById(req.params.blogId);
  }

  async getBlogsByCategoryString(string, req, res) {
    //خواندن مقالات مخصوص دسته بندی انتخاب شده از دیتابیس
    let array = [];
    const blogs = await this.getAllBlogs(req, res);
    if (blogs) {
      blogs.forEach((blog) => {
        if (blog.categoryId && string.includes(blog.categoryId.toString())) {
          array.push(blog);
        }
      });
    }
    return array;
  }

  async createBlog(req, res) {
    //اضافه کردن مقاله
    const newBlog = new Blog({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
    });
    if (req.body.categoryId) {
      newBlog.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    if (req.file) {
      newBlog.img = req.file.path.replace(/\\/g, "/").substring(6); //تنظیم آدرس تصویر مقاله برای ذخیره در مونگو دی بی
    }
    return newBlog.save();
  }

  //بروزرسانی مقاله
  async updateBlog(req, res) {
    const blog = await this.seeOneBlog(req, res);
    let data = {
      title: req.body.title,
      author: req.body.author,
      categoryId: blog.categoryId,
      description: req.body.description,
      img: blog.img,
    };
    if (req.body.categoryId) {
      data.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
    }
    if (req.file) {
      deleteFile("public" + blog.img, "public" + blog.img);
      data.img = req.file.path.replace(/\\/g, "/").substring(6); //تنظیم آدرس تصویر پروفایل برای ذخیره در مونگو دی بی
    }
    const updateOp = await Blog.updateOne({ _id: blog.id }, { $set: data });
    if (updateOp.modifiedCount.valueOf() > 0) {
      return true;
    }
    return false;
  }

  //انتقال مقالات به کتگوری دیگر بعد از حذف کتگوری فعلی
  async sendToParentCategory(parentCategoryId, req, res) {
    let newCategoryId = null; //بدون دسته بندی
    if (parentCategoryId != "root") {
      newCategoryId = parentCategoryId;
    }
    await Blog.updateMany(
      { categoryId: new mongoose.Types.ObjectId(req.params.categoryId) },
      { $set: { categoryId: newCategoryId } }
    );
  }

  async deleteBlog(req, res) {
    //حذف مقاله
    const blog = await this.seeOneBlog(req, res);
    if (blog) {
      deleteFile("public" + blog.img, "public" + blog.img);
      const deleteOp = await Blog.deleteOne({ _id: req.params.blogId });
      if (deleteOp.deletedCount.valueOf() > 0) {
        return true;
      }
    }
    return false;
  }
}
module.exports = new BlogServices();
