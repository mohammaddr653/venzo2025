const mongoose = require("mongoose");
const Category = require("../models/category");

class CategoriesServices {
  async getAllCategories(req, res) {
    //خواندن تمام دسته بندی ها از دیتابیس
    return Category.find({});
  }
  async seeOneCategory(req, res) {
    // خواندن یک دسته بندی از دیتابیس
    return Category.findById(req.params.categoryId);
  }

  async createCategory(req, res) {
    //اضافه کردن دسته بندی
    const newCategory = new Category({
      name: req.body.name,
    });
    if (req.body.motherId) {
      newCategory.motherId = new mongoose.Types.ObjectId(req.body.motherId);
    }
    if (req.body.path) {
      newCategory.path = req.body.path;
    }
    return newCategory.save();
  }

  //بروزرسانی دسته بندی
  async updateCategory(req, res) {
    const category = await this.seeOneCategory(req, res);
    if (category) {
      let data = {
        name: req.body.name,
        motherId: req.body.motherId,
        path: req.body.path,
      };
      const updateOp = await Category.updateOne(
        { _id: category.id },
        { $set: data }
      );
      if (updateOp.modifiedCount.valueOf() > 0) {
        return true;
      }
    }
    return false;
  }

  async deleteCategory(req, res) {
    //حذف دسته بندی . آیدی را میگیرد ، دسته بندی را حذف میکند و فرزندان آن را به دسته بندی مادر بالاتر منتقل می کند
    let parentCategoryId;
    const category = await this.seeOneCategory(req, res);
    if (category) {
      const deleteOp = await Category.deleteOne({ _id: category.id });
      if (deleteOp.deletedCount.valueOf() > 0) {
        parentCategoryId = category.motherId;
        await Category.updateMany(
          { motherId: category._id },
          { $set: { motherId: category.motherId } }
        );
      }
    }
    return parentCategoryId;
  }

  //آیدی کتگوری سرچ شده رو میگیره و یک رشته مشتق شده از این آیدی و تمام آیدی های زیرمجموعه اش بر میگردونه
  async createString(req, res) {
    let string = req.params.categoryString;
    const categories = await this.getAllCategories(req, res);
    if (categories) {
      const loop = (array, id) => {
        array.forEach((obj) => {
          if (obj.motherId.toString() === id) {
            string = string.concat(obj.id);
            loop(categories, obj.id);
          }
        });
      };
      loop(categories, req.params.categoryString);
    }
    return string;
  }
}
module.exports = new CategoriesServices();
