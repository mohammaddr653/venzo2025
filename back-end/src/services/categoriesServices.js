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
      type: req.body.type,
      link: req.body.link,
    });
    if (req.body.motherId) {
      const exist = await Category.findById(req.body.motherId);
      if (!exist) return false;
      newCategory.motherId = new mongoose.Types.ObjectId(req.body.motherId);
    }
    return newCategory.save();
  }

  //بروزرسانی دسته بندی
  async updateCategory(req, res) {
    const category = await this.seeOneCategory(req, res);
    if (category) {
      let data = {
        name: req.body.name,
        motherId:
          req.body.motherId === "root"
            ? req.body.motherId
            : new mongoose.Types.ObjectId(req.body.motherId),
        type: req.body.type,
        link: req.body.link,
      };
      if (req.body.motherId !== category.id) {
        if (req.body.motherId !== "root") {
          const exist = await Category.findById(req.body.motherId);
          if (!exist) return false;
        }
        const updateOp = await Category.updateOne(
          { _id: category.id },
          { $set: data }
        );
        if (updateOp.modifiedCount.valueOf() > 0) {
          return true;
        }
      } else {
        return false;
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

  //آیدی کتگوری سرچ شده رو میگیره و یک آرایه مشتق شده از این آیدی و تمام آیدی های زیرمجموعه اش بر میگردونه
  async createCategoryArr(req, res) {
    const initialId = new mongoose.Types.ObjectId(req.params.categoryString);
    let categoryArr = [initialId];
    const categories = await this.getAllCategories(req, res);
    if (categories) {
      const loop = (array, id) => {
        array.forEach((obj) => {
          if (typeof obj.motherId !== "string" && obj.motherId.equals(id)) {
            categoryArr.push(obj._id);
            loop(categories, obj._id);
          }
        });
      };
      loop(categories, initialId);
    }
    return categoryArr;
  }
}
module.exports = new CategoriesServices();
