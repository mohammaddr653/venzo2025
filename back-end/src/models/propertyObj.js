//در فاز بعدی توسعه ، با این مدل کار داریم

const mongoose = require("mongoose");

const propertyvalObjSchema = new mongoose.Schema(
  {
    value: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Propertyval",
    },
    valueString: {
      type: String,
    },
    price: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    hex: {
      type: String,
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
    nameString: {
      type: String,
      ref: "Property",
    },
    selective: { type: Boolean, required: true },
    type: { type: String, required: true, enum: ["ordinary", "color"] },
    values: [propertyvalObjSchema],
  },
  { _id: false }
);
module.exports = propertyObjSchema;
