const mongoose = require("mongoose");

const expenseSchema =
  new mongoose.Schema({

    // USER ID
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // USER EMAIL
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // EXPENSE TITLE
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // AMOUNT
    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    // CATEGORY
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // DATE
    date: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Expense",
  expenseSchema
);