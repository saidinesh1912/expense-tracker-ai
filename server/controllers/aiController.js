const axios = require("axios");

const generateInsights = async (req, res) => {

  try {

    const {
      expenses,
      question,
    } = req.body;

    // HANDLE EMPTY EXPENSES
    if (!expenses || expenses.length === 0) {

      return res.status(400).json({
        message:
          "No expenses found for analysis",
      });
    }

    // BUILD EXPENSE SUMMARY
    const expenseSummary = expenses.map(
      (expense) => {

        return `
Title: ${expense.title}
Amount: ₹${expense.amount}
Category: ${expense.category}
Date: ${expense.date}
`;
      }
    ).join("\n");

    // AI PROMPT
    const prompt = `
You are an advanced AI Financial Assistant.

Analyze the user's real financial data carefully.

USER EXPENSES:
${expenseSummary}

USER QUESTION:
${question}

YOUR TASK:
- Answer the user's question directly
- Analyze spending behavior
- Identify overspending patterns
- Suggest savings opportunities
- Give personalized advice
- Mention important categories
- Keep response practical and concise
- Sound like a smart finance coach

IMPORTANT:
Do not give generic answers.
Base the response on the actual expenses provided.
`;

    // OPENROUTER API CALL
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "system",
            content:
              "You are a professional AI financial advisor.",
          },

          {
            role: "user",
            content: prompt,
          },

        ],
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    // AI RESPONSE
    const insight =
      response.data.choices[0].message.content;

    res.status(200).json({
      insight,
    });

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      message:
        "Failed to generate AI insights",
    });
  }
};

module.exports = {
  generateInsights,
};