const mongoose = require("mongoose");
const Category = require("../models/category");
const serviceResponse = require("../helpers/serviceResponse");

class CategoriesServices {
  async getAllCategories(req, res) {
    //خواندن تمام دسته بندی ها از دیتابیس
    const findOp = await Category.find({});
    return serviceResponse(200, findOp);
  }
  async seeOneCategory(req, res) {
    // خواندن یک دسته بندی از دیتابیس
    const findOp = await Category.findById(req.params.categoryId);
    return serviceResponse(200, findOp);
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
      if (!exist) return serviceResponse(404, {});
      newCategory.motherId = new mongoose.Types.ObjectId(req.body.motherId);
    }
    const saveOp = await newCategory.save();
    return serviceResponse(200, saveOp);
  }

  //بروزرسانی دسته بندی
  async updateCategory(req, res) {
    const { data: category } = await this.seeOneCategory(req, res);
    if (category) {
      category.name = req.body.name;
      category.motherId =
        req.body.motherId === "root"
          ? "root"
          : new mongoose.Types.ObjectId(req.body.motherId);
      category.type = req.body.type;
      category.link = req.body.link;
      if (req.body.motherId !== category.id) {
        if (req.body.motherId !== "root") {
          const exist = await Category.findById(req.body.motherId);
          if (!exist) return serviceResponse(404, {});
        }
        await category.save();
        return serviceResponse(200, {});
      } else {
        return serviceResponse(403, {});
      }
    }
    return serviceResponse(404, {});
  }

  async deleteCategory(req, res) {
    //حذف دسته بندی . آیدی را میگیرد ، دسته بندی را حذف میکند و فرزندان آن را به دسته بندی مادر بالاتر منتقل می کند
    let parentCategoryId;
    const deleteOp = await Category.findOneAndDelete({
      _id: req.params.categoryId,
    });
    if (deleteOp) {
      parentCategoryId = deleteOp.motherId;
      await Category.updateMany(
        { motherId: deleteOp._id },
        { $set: { motherId: deleteOp.motherId } }
      );
      return serviceResponse(200, parentCategoryId);
    }
    return serviceResponse(404, {});
  }

  //آیدی کتگوری سرچ شده رو میگیره و یک آرایه مشتق شده از این آیدی و تمام آیدی های زیرمجموعه اش بر میگردونه
  async createCategoryArr(req, res) {
    const initialId = new mongoose.Types.ObjectId(req.params.categoryString);
    let categoryArr = [initialId];
    const { data: categories } = await this.getAllCategories(req, res);
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
    return serviceResponse(200, categoryArr);
  }
}
module.exports = new CategoriesServices();
