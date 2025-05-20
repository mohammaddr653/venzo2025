//در فاز بعدی توسعه ، با این مدل کار داریم

const mongoose = require("mongoose");

const propertyvalObjSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Propertyval",
    },
  },
  { _id: false }
);

const propertyObjSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    values: [propertyvalObjSchema],
  },
  { _id: false }
);
module.exports = propertyObjSchema;
