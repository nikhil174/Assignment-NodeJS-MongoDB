const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name of the product"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add the quantity of the product"],
    },
    description: {
      type: String,
      required: [true, "Please add the description of the product"],
    },
    price: {
      type: Number,
      required: [true, "Please add the price of the product"],
    },
    _createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
