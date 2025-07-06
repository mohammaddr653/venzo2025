//note: used serviceResponse but I didnt checked it works properly or not
const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const Blog = require("../models/blog");
const serviceResponse = require("../helpers/serviceResponse");

class BlogServices {
  async getAllBlogs(req, res) {
    //خواندن تمام مقالات از دیتابیس
    const findOp = await Blog.find({});
    return serviceResponse(200, findOp);
  }
  async seeOneBlog(req, res) {
    // خواندن یک مقاله از دیتابیس
    const findOp = await Blog.findById(req.params.blogId);
    return serviceResponse(200, findOp);
  }

  //note:this function needs to fix .
  async getBlogsByCategoryString(string, req, res) {
    //خواندن مقالات مخصوص دسته بندی انتخاب شده از دیتابیس
    let array = [];
    const { data: blogs } = await this.getAllBlogs(req, res);
    if (blogs) {
      blogs.forEach((blog) => {
        if (blog.categoryId && string.includes(blog.categoryId.toString())) {
          array.push(blog);
        }
      });
    }
    return serviceResponse(200, array);
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
      newBlog.img = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس تصویر مقاله برای ذخیره در مونگو دی بی
    }
    const saveOp = await newBlog.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی مقاله
  async updateBlog(req, res) {
    const { data: blog } = await this.seeOneBlog(req, res);
    if (blog) {
      blog.title = req.body.title;
      blog.author = req.body.author;
      blog.description = req.body.description;
      if (req.body.categoryId) {
        blog.categoryId = new mongoose.Types.ObjectId(req.body.categoryId);
      }
      if (req.file) {
        blog.img
          ? deleteFile(blog.img.substring(1), blog.img.substring(1))
          : null;
        blog.img = "/" + req.file.path.replace(/\\/g, "/"); //تنظیم آدرس تصویر پروفایل برای ذخیره در مونگو دی بی
      }
      const updateOp = await blog.save();
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
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
    return serviceResponse(200, {});
  }

  async deleteBlog(req, res) {
    //حذف مقاله
    const deleteOp = await Blog.findOneAndDelete({ _id: req.params.blogId });
    if (deleteOp) {
      deleteOp.img
        ? deleteFile(deleteOp.img.substring(1), deleteOp.img.substring(1))
        : null;
      return serviceResponse(200, {});
    }
    return serviceResponse(404, {});
  }
}
module.exports = new BlogServices();
