//router
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const validator = require("./validator");
const uploadProductImg = require("../../../upload/uploadProductImg");
const uploadBlogImg = require("../../../upload/uploadBlogImg");
const productFileToReqBody = require("../../middlewares/productFileToReqBody");
const blogFileToReqBody = require("../../middlewares/blogFileToReqBody");

router.get("/dashboard", controller.dashboard.bind(controller));

//users

router.get("/dashboard/users", controller.getUsers.bind(controller));
router.get("/dashboard/users/:userId", controller.seeOneUser.bind(controller));
router.post(
  "/dashboard/users",
  validator.createCheck(),
  controller.validate.bind(controller),
  controller.createUser.bind(controller)
);
router.put(
  "/dashboard/users/:userId",
  validator.updateCheck(),
  controller.validate.bind(controller),
  controller.updateUser.bind(controller)
);
router.delete(
  "/dashboard/users/:userId",
  controller.deleteUser.bind(controller)
);

//categories

router.post(
  "/dashboard/categories",
  validator.categoryValidator(),
  controller.validate.bind(controller),
  controller.createCategory.bind(controller)
);
router.get("/dashboard/categories", controller.getCategories.bind(controller));
router.get(
  "/dashboard/categories/:categoryId",
  controller.seeOneCategory.bind(controller)
);
router.put(
  "/dashboard/categories/:categoryId",
  validator.categoryUpdateCheck(),
  controller.validate.bind(controller),
  controller.updateCategory.bind(controller)
);
router.delete(
  "/dashboard/categories/:categoryId",
  controller.deleteCategory.bind(controller)
);

//products

router.get("/dashboard/products", controller.getProducts.bind(controller));

router.get(
  "/dashboard/products/:productId",
  controller.seeOneProduct.bind(controller)
);

router.post(
  "/dashboard/products",
  uploadProductImg.single("img"),
  productFileToReqBody,
  validator.productValidator(),
  controller.validate.bind(controller),
  controller.createProduct.bind(controller)
);

router.put(
  "/dashboard/products/:productId",
  uploadProductImg.single("img"),
  productFileToReqBody,
  validator.updateProductValidator(),
  controller.validate.bind(controller),
  controller.updateProduct.bind(controller)
);

router.delete(
  "/dashboard/products/:productId",
  controller.deleteProduct.bind(controller)
);

//blogs

router.get("/dashboard/blogs", controller.getBlogs.bind(controller));

router.get("/dashboard/blogs/:blogId", controller.seeOneBlog.bind(controller));

router.post(
  "/dashboard/blogs",
  uploadBlogImg.single("img"),
  blogFileToReqBody,
  validator.blogValidator(),
  controller.validate.bind(controller),
  controller.createBlog.bind(controller)
);

router.put(
  "/dashboard/blogs/:blogId",
  uploadBlogImg.single("img"),
  blogFileToReqBody,
  validator.updateBlogValidator(),
  controller.validate.bind(controller),
  controller.updateBlog.bind(controller)
);

router.delete(
  "/dashboard/blogs/:blogId",
  controller.deleteBlog.bind(controller)
);

module.exports = router;
