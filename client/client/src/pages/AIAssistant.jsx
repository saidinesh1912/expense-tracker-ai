import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AIAssistant = () => {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [expenses, setExpenses] =
    useState([]);

  const token =
    localStorage.getItem("token");

  const userEmail =
    localStorage.getItem("userEmail");

  // FETCH USER EXPENSES
  const fetchExpenses = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/expenses`,
        {
          headers: {
            Authorization: token,
            email: userEmail,
          },
        }
      );

      setExpenses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD EXPENSES
  useEffect(() => {

    fetchExpenses();

  }, []);

  // ASK AI
  const askAI = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    try {

      const res = await axios.post(
        `${API_URL}/api/ai/insights`,
        {
          expenses,
          question,
        }
      );

      const aiMessage = {
        role: "assistant",
        content: res.data.insight,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      console.log(
        error.response?.data
      );

      alert("AI failed");

    }

    setQuestion("");

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white p-10">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-purple-400 mb-3">

          AI Financial Assistant

        </h1>

        <p className="text-zinc-400">

          Ask smart financial questions powered by AI

        </p>

      </div>

      {/* CHAT BOX */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-[600px] flex flex-col">

        {/* MESSAGES */}

        <div className="flex-1 overflow-y-auto space-y-5 mb-6">

          {
            messages.length === 0 && (

              <div className="text-zinc-500 text-center mt-20 leading-8">

                Ask something like:

                <br />

                "How can I save money?"

                <br />

                "Analyze my spending habits"

                <br />

                "Where am I overspending?"

              </div>

            )
          }

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`max-w-[75%] p-5 rounded-3xl whitespace-pre-line ${
                  msg.role === "user"
                    ? "ml-auto bg-cyan-500/20 border border-cyan-400/20"
                    : "bg-purple-500/20 border border-purple-400/20"
                }`}
              >

                {msg.content}

              </div>

            ))
          }

          {
            loading && (

              <div className="bg-purple-500/20 border border-purple-400/20 p-5 rounded-3xl w-fit">

                AI is thinking...

              </div>

            )
          }

        </div>

        {/* INPUT */}

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Ask AI about your finances..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                askAI();

              }

            }}
            className="flex-1 bg-black/30 border border-white/10 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={askAI}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 rounded-2xl font-bold hover:scale-105 transition"
          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

};

export default AIAssistant;