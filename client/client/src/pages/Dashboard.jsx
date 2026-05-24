import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL;

const Dashboard = ({
  darkMode,
}) => {

  const navigate =
    useNavigate();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [expenses, setExpenses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "Food",
      date: "",
    });

  const token =
    localStorage.getItem("token");

  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  // CATEGORY COLORS
  const CATEGORY_COLORS = {

    Food: "#FF6B6B",

    Travel: "#4D96FF",

    Shopping: "#FFD93D",

    Bills: "#9D4EDD",

    Entertainment: "#00C897",

    Health: "#FF9F1C",

  };

  // FETCH EXPENSES
  const fetchExpenses =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/expenses`,
            {
              headers: {
                Authorization:
                  token,
                email:
                  userEmail,
              },
            }
          );

        setExpenses(
          res.data
        );

      } catch (error) {

  console.log(
    error.response?.data ||
    error.message
  );

  alert(
    error.response?.data?.message ||
    "Failed to add expense"
  );

}
    };

  // LOAD DATA
  useEffect(() => {

    fetchExpenses();

  }, []);

  // HANDLE INPUT
  const handleChange = (
    e
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ADD EXPENSE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          `${API_URL}/api/expenses`,
          {
            ...formData,
            userEmail,
          },

          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        setFormData({
          title: "",
          amount: "",
          category:
            "Food",
          date: "",
        });

        fetchExpenses();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // DELETE EXPENSE
  const deleteExpense =
    async (id) => {

      try {

          await axios.delete(
            `${API_URL}/api/expenses/${id}`,
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        fetchExpenses();

      } catch (error) {

        console.log(
          error
        );
      }
    };

  // TOTALS
  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const totalTransactions =
    expenses.length;

  // CATEGORY BREAKDOWN
  const categoryData = [];

  expenses.forEach(
    (expense) => {

      const existing =
        categoryData.find(
          (item) =>
            item.category ===
            expense.category
        );

      if (existing) {

        existing.amount +=
          expense.amount;

      } else {

        categoryData.push({
          category:
            expense.category,
          amount:
            expense.amount,
        });
      }
    }
  );

  // TOP CATEGORY
  const topCategory =
    categoryData.sort(
      (a, b) =>
        b.amount -
        a.amount
    )[0];

  return (

    <div
      className={`min-h-screen flex transition-all duration-500 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-[#050816] via-[#0b1023] to-[#1b1145] text-white"
          : "bg-gradient-to-br from-[#eef4ff] via-[#f8fbff] to-[#e0f2fe] text-black"
      }`}
    >

      {/* MOBILE TOPBAR */}

      <div
        className={`md:hidden fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-5 backdrop-blur-3xl border-b ${
          darkMode
            ? "bg-black/40 border-white/10"
            : "bg-white/40 border-black/10"
        }`}
      >

        <h1 className="text-2xl font-black text-cyan-400">
          ExpenseAI
        </h1>

        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
        >

          {
            mobileMenu
              ? <X size={30} />
              : <Menu size={30} />
          }

        </button>

      </div>

      {/* SIDEBAR */}

      <div
        className={`

          fixed md:relative
          top-0 left-0 z-50

          w-[270px]
          min-h-screen

          flex flex-col justify-between

          p-8 border-r backdrop-blur-3xl

          transition-transform duration-500

          ${
            mobileMenu
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }

          ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/40 border-white/30"
          }
        `}
        style={{
          boxShadow:
            darkMode
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(31,38,135,0.15)",

          backdropFilter:
            "blur(20px)",

          WebkitBackdropFilter:
            "blur(20px)",
        }}
      >

        <div>

          <h1 className="text-4xl font-black text-cyan-400 mb-14 tracking-wide">
            ExpenseAI
          </h1>

          <div className="space-y-4">

            <div
              onClick={() => {
                navigate("/dashboard");
                setMobileMenu(false);
              }}
              className="bg-cyan-500/20 border border-cyan-400/30 p-4 rounded-2xl cursor-pointer font-semibold backdrop-blur-xl hover:scale-[1.03] transition"
            >
              Dashboard
            </div>

            <div
              onClick={() => {
                navigate("/analytics");
                setMobileMenu(false);
              }}
              className="hover:bg-white/10 transition p-4 rounded-2xl cursor-pointer"
            >
              Analytics
            </div>

            <div
              onClick={() => {
                navigate("/ai-assistant");
                setMobileMenu(false);
              }}
              className="hover:bg-white/10 transition p-4 rounded-2xl cursor-pointer"
            >
              AI Assistant
            </div>

            <div
              onClick={() => {
                navigate("/settings");
                setMobileMenu(false);
              }}
              className="hover:bg-white/10 transition p-4 rounded-2xl cursor-pointer"
            >
              Settings
            </div>

          </div>

        </div>

        {/* USER */}

        <div
          className={`p-5 rounded-3xl border backdrop-blur-2xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/40 border-white/30"
          }`}
        >

          <p className="text-sm mb-2 text-cyan-400">
            Logged in as
          </p>

          <p className="font-semibold break-all">
            {userEmail}
          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 p-6 pt-28 md:pt-10 md:p-10 overflow-y-auto">

        {/* HEADER */}

        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Financial Dashboard
          </h1>

          <p
            className={
              darkMode
                ? "text-zinc-400 text-base md:text-lg"
                : "text-gray-600 text-base md:text-lg"
            }
          >
            Manage your finances with futuristic AI-powered tracking
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL */}

          <div
            className={`p-8 rounded-[32px] border backdrop-blur-3xl transition hover:scale-[1.02] ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/30"
            }`}
          >

            <p className="text-zinc-400 mb-3">
              Total Expenses
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-cyan-400">
              ₹ {totalExpenses}
            </h1>

          </div>

          {/* TRANSACTIONS */}

          <div
            className={`p-8 rounded-[32px] border backdrop-blur-3xl transition hover:scale-[1.02] ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/30"
            }`}
          >

            <p className="text-zinc-400 mb-3">
              Transactions
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-purple-400">
              {totalTransactions}
            </h1>

          </div>

          {/* TOP CATEGORY */}

          <div
            className={`p-8 rounded-[32px] border backdrop-blur-3xl transition hover:scale-[1.02] ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/30"
            }`}
          >

            <p className="text-zinc-400 mb-3">
              Top Category
            </p>

            <h1
              className="text-3xl md:text-4xl font-black"
              style={{
                color:
                  topCategory
                    ? CATEGORY_COLORS[
                        topCategory.category
                      ]
                    : "#ffffff",
              }}
            >
              {
                topCategory
                  ?.category ||
                "None"
              }
            </h1>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ADD EXPENSE */}

          <div
            className={`p-8 rounded-[32px] border backdrop-blur-3xl ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/30"
            }`}
          >

            <h2 className="text-3xl font-black mb-8">
              Add Expense
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl outline-none border backdrop-blur-xl ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/40 border-white/30"
                }`}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl outline-none border backdrop-blur-xl ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/40 border-white/30"
                }`}
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl outline-none border backdrop-blur-xl ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/40 border-white/30"
                }`}
              >

                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Health</option>

              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl outline-none border backdrop-blur-xl ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/40 border-white/30"
                }`}
              />

              <button
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-[1.02] transition duration-300 p-4 rounded-2xl font-bold text-white shadow-2xl"
              >
                Add Expense
              </button>

            </form>

          </div>

          {/* ANALYTICS */}

          <div
            className={`p-8 rounded-[32px] border backdrop-blur-3xl ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/40 border-white/30"
            }`}
          >

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-black">
                Analytics
              </h2>

              <button
                onClick={() =>
                  navigate("/analytics")
                }
                className="text-cyan-400 font-semibold hover:scale-105 transition"
              >
                View More →
              </button>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="amount"
                    nameKey="category"
                    outerRadius={120}
                    innerRadius={55}
                    paddingAngle={4}
                  >

                    {categoryData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            CATEGORY_COLORS[
                              entry.category
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;