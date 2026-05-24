import { useEffect, useState } from "react";

import axios from "axios";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API_URL =
  import.meta.env.VITE_API_URL;

const Analytics = ({
  darkMode,
}) => {

  const [expenses, setExpenses] =
    useState([]);

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
          error
        );

      }

    };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // TOTAL EXPENSES

  const totalExpenses =
    expenses.reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  // TOTAL TRANSACTIONS

  const totalTransactions =
    expenses.length;

  // CATEGORY DATA

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

      }

      else {

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

  const highestCategory =
    categoryData.reduce(
      (max, item) =>

        item.amount >
        max.amount

          ? item

          : max,

      {

        category:
          "None",

        amount:
          0,

      }
    );

  return (

    <div
      className={`min-h-screen p-10 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#050816] via-[#0b1023] to-[#1b1145] text-white"
          : "bg-gradient-to-br from-[#eef4ff] via-[#f8fbff] to-[#e0f2fe] text-black"
      }`}
    >

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-black text-cyan-400 mb-4">

          Expense Analytics

        </h1>

        <p
          className={
            darkMode
              ? "text-zinc-400 text-lg"
              : "text-gray-600 text-lg"
          }
        >

          Smart financial insights and spending trends

        </p>

      </div>

      {/* SUMMARY */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div
          className={`p-8 rounded-[32px] border backdrop-blur-3xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/40 border-white/30"
          }`}
        >

          <p>Total Expenses</p>

          <h1 className="text-5xl font-black text-cyan-400">

            ₹ {totalExpenses}

          </h1>

        </div>

        <div
          className={`p-8 rounded-[32px] border backdrop-blur-3xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/40 border-white/30"
          }`}
        >

          <p>Transactions</p>

          <h1 className="text-5xl font-black text-purple-400">

            {totalTransactions}

          </h1>

        </div>

        <div
          className={`p-8 rounded-[32px] border backdrop-blur-3xl ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/40 border-white/30"
          }`}
        >

          <p>Top Category</p>

          <h1
            className="text-4xl font-black"
            style={{
              color:
                CATEGORY_COLORS[
                  highestCategory.category
                ] || "#ffffff",
            }}
          >

            {highestCategory.category}

          </h1>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="p-8 rounded-[32px] border backdrop-blur-3xl h-[500px]">

          <h2 className="text-3xl font-black mb-6">

            Category Breakdown

          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                outerRadius={150}
                innerRadius={60}
                paddingAngle={5}
                label
              >

                {

                  categoryData.map(
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
                  )

                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="p-8 rounded-[32px] border backdrop-blur-3xl h-[500px]">

          <h2 className="text-3xl font-black mb-6">

            Expense Comparison

          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={categoryData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="category"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                radius={[
                  12,
                  12,
                  0,
                  0,
                ]}
              >

                {

                  categoryData.map(
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
                  )

                }

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

};

export default Analytics;