const Expense = require("../models/Expense");

// ADD EXPENSE
const addExpense = async (req, res) => {

  try {

    const {
      title,
      amount,
      category,
      date,
      userEmail,
    } = req.body;

    // VALIDATION
    if (
      !title ||
      !amount ||
      !category ||
      !userEmail
    ) {

      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    // CREATE EXPENSE
    const expense =
      await Expense.create({

        userEmail,

        title,

        amount,

        category,

        date,
      });

    res.status(201).json(expense);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER EXPENSES
const getExpenses = async (req, res) => {

  try {

    const userEmail =
      req.headers.email;

    if (!userEmail) {

      return res.status(400).json({
        message:
          "User email missing",
      });
    }

    const expenses =
      await Expense.find({
        userEmail,
      }).sort({
        date: -1,
      });

    res.status(200).json(expenses);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {

  try {

    const deletedExpense =
      await Expense.findByIdAndDelete(
        req.params.id
      );

    if (!deletedExpense) {

      return res.status(404).json({
        message:
          "Expense not found",
      });
    }

    res.status(200).json({
      message:
        "Expense deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
};