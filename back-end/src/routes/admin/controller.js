//controller
const debug = require("debug")("app");
const deleteFile = require("../../helpers/deleteFile");
const blogServices = require("../../services/blogServices");
const categoriesServices = require("../../services/categoriesServices");
const productServices = require("../../services/productServices");
const userServices = require("../../services/userServices");
const controller = require("./../controller");
const _ = require("lodash");

module.exports = new (class extends controller {
  async dashboard(req, res) {
    this.response({
      res,
      message: "this is admin dashboard",
      data: _.pick(req.user, ["name", "email", "isadmin"]),
    });
  }

  async getUsers(req, res) {
    const result = await userServices.getAllUsers(req);
    this.response({
      res,
      message: "this is all users",
      data: result,
    });
  }

  async seeOneUser(req, res) {
    const result = await userServices.seeOneUser(req, res);
    this.response({
      res,
      message: "this is user",
      data: result,
    });
  }

  async createUser(req, res) {
    const result = await userServices.registerUser(req, res);
    if (result.code === 400) {
      return this.response({
        res,
        message: "کاربری با این ایمیل قبلا ثبت نام کرده است",
        code: 400,
      });
    }
    this.response({
      res,
      message: "کاربر با موفقیت ثبت نام شد",
      data: result.data,
    });
  }

  async updateUser(req, res) {
    const result = await userServices.updateUser(req, res);
    if (result) {
      this.response({
        res,
        message: "کاربر با موفقیت بروزرسانی شد",
      });
    } else {
      this.response({
        res,
        message: "بروزرسانی کاربر ناموفق بود",
        code: 400,
      });
    }
  }

  async deleteUser(req, res) {
    const result = await userServices.deleteUser(req, res);
    if (result) {
      this.response({
        res,
        message: "کاربر با موفقیت حذف شد",
      });
    } else {
      this.response({
        res,
        message: "حذف کاربر ناموفق بود",
        code: 400,
      });
    }
  }

  async createCategory(req, res) {
    const result = await categoriesServices.createCategory(req, res);
    if (result) {
      this.response({
        res,
        message: "دسته بندی با موفقیت ساخته شد",
        data: result,
      });
    } else {
      this.response({
        res,
        message: "ساخت دسته بندی ناموفق بود",
        code: 400,
      });
    }
  }

  async seeOneCategory(req, res) {
    const result = await categoriesServices.seeOneCategory(req, res);
    this.response({
      res,
      message: "نمایش یک دسته بندی",
      data: result,
    });
  }

  async updateCategory(req, res) {
    const result = await categoriesServices.updateCategory(req, res);
    if (result) {
      this.response({
        res,
        message: "دسته بندی با موفقیت بروزرسانی شد",
      });
    } else {
      this.response({
        res,
        message: "بروزرسانی دسته بندی ناموفق بود",
        code: 400,
      });
    }
  }

  async deleteCategory(req, res) {
    const parentCategoryId = await categoriesServices.deleteCategory(req, res); //آیدی کتگوری انتخاب شده را حذف میکنه و آیدی کتگوری بالاتر را برمیگردونه تا محصولات کتگوری حذف شده رو بهش منتقل کنیم
    await productServices.sendToParentCategory(parentCategoryId, req, res);
    await blogServices.sendToParentCategory(parentCategoryId, req, res);
    if (parentCategoryId) {
      this.response({
        res,
        message: "دسته بندی با موفقیت حذف شد",
      });
    }
  }

  async seeOneProduct(req, res) {
    const result = await productServices.seeOneProduct(req, res);
    this.response({
      res,
      message: "نمایش یک محصول",
      data: result,
    });
  }

  async createProduct(req, res) {
    const result = await productServices.createProduct(req, res);
    if (result) {
      this.response({
        res,
        message: "محصول با موفقیت ساخته شد",
        data: result,
      });
    } else {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteFile(req.file.path, req.file.path);

      this.response({
        res,
        message: "خطا در ساخت محصول",
      });
    }
  }

  async updateProduct(req, res) {
    const result = await productServices.updateProduct(req, res);
    if (result) {
      this.response({
        res,
        message: "محصول با موفقیت بروزرسانی شد",
      });
    } else {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteFile(req.file.path, req.file.path);

      this.response({
        res,
        message: "خطا در بروزرسانی محصول",
        code: 400,
      });
    }
  }

  async deleteProduct(req, res) {
    const result = await productServices.deleteProduct(req, res);
    if (result) {
      this.response({
        res,
        message: "محصول با موفقیت حذف شد",
      });
    } else {
      this.response({
        res,
        message: "حذف محصول ناموفق بود",
        code: 400,
      });
    }
  }

  async getBlogs(req, res) {
    const result = await blogServices.getAllBlogs(req, res);
    this.response({
      res,
      message: "لیست مقالات",
      data: result,
    });
  }

  async seeOneBlog(req, res) {
    const result = await blogServices.seeOneBlog(req, res);
    this.response({
      res,
      message: "نمایش یک مقاله",
      data: result,
    });
  }

  async createBlog(req, res) {
    const result = await blogServices.createBlog(req, res);
    if (result) {
      this.response({
        res,
        message: "مقاله با موفقیت ساخته شد",
        data: result,
      });
    } else {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteFile(req.file.path, req.file.path);

      this.response({
        res,
        message: "خطا در ساخت مقاله",
      });
    }
  }

  async updateBlog(req, res) {
    const result = await blogServices.updateBlog(req, res);
    if (result) {
      this.response({
        res,
        message: "مقاله با موفقیت بروزرسانی شد",
      });
    } else {
      if (req.file)
        //if some files uploaded with this req , delete them
        deleteFile(req.file.path, req.file.path);

      this.response({
        res,
        message: "خطا در بروزرسانی مقاله",
        code: 400,
      });
    }
  }

  async deleteBlog(req, res) {
    const result = await blogServices.deleteBlog(req, res);
    if (result) {
      this.response({
        res,
        message: "مقاله با موفقیت حذف شد",
      });
    } else {
      this.response({
        res,
        message: "حذف مقاله ناموفق بود",
        code: 400,
      });
    }
  }
})();
