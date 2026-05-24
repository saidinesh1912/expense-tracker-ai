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

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [expenses,
    setExpenses] =
    useState([]);

  const [formData,
    setFormData] =
    useState({

      title:"",
      amount:"",
      category:"Food",
      date:"",

    });

  const token =
    localStorage.getItem(
      "token"
    );

  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  const CATEGORY_COLORS = {

    Food:"#FF6B6B",

    Travel:"#4D96FF",

    Shopping:"#FFD93D",

    Bills:"#9D4EDD",

    Entertainment:"#00C897",

    Health:"#FF9F1C",

  };

  const fetchExpenses =
    async()=>{

      try{

        const res =
          await axios.get(

            `${API_URL}/api/expenses`,

            {

              headers:{

                Authorization:
                token,

                email:
                userEmail,

              }

            }

          );

        setExpenses(
          res.data
        );

      }

      catch(error){

        console.log(

          error.response?.data ||

          error.message

        );

      }

    };

  useEffect(()=>{

    fetchExpenses();

  },[]);

  const handleChange =
    (e)=>{

      setFormData({

        ...formData,

        [e.target.name]:
        e.target.value,

      });

    };

  const handleSubmit =
    async(e)=>{

      e.preventDefault();

      try{

        await axios.post(

          `${API_URL}/api/expenses`,

          {

            ...formData,

            amount:Number(
              formData.amount
            ),

            userEmail,

          },

          {

            headers:{

              Authorization:
              token,

            }

          }

        );

        setFormData({

          title:"",

          amount:"",

          category:"Food",

          date:"",

        });

        fetchExpenses();

      }

      catch(error){

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

  const deleteExpense =
    async(id)=>{

      try{

        await axios.delete(

          `${API_URL}/api/expenses/${id}`,

          {

            headers:{

              Authorization:
              token,

            }

          }

        );

        fetchExpenses();

      }

      catch(error){

        console.log(

          error.response?.data ||

          error.message

        );

      }

    };

  const totalExpenses =
    expenses.reduce(

      (acc,item)=>

      acc+item.amount,

      0

    );

  const totalTransactions =
    expenses.length;

  const categoryData=[];

  expenses.forEach(

    expense=>{

      const existing=
      categoryData.find(

        item=>

        item.category===

        expense.category

      );

      if(existing){

        existing.amount+=
        expense.amount;

      }

      else{

        categoryData.push({

          category:
          expense.category,

          amount:
          expense.amount,

        });

      }

    }

  );

  return(

<div className={`min-h-screen flex ${
darkMode
?
"bg-gradient-to-br from-[#050816] via-[#0b1023] to-[#1b1145] text-white"
:
"bg-gradient-to-br from-[#eef4ff] via-[#f8fbff] to-[#e0f2fe] text-black"
}`}>

<div className="flex-1 p-6 md:p-10">

<h1 className="text-5xl font-black mb-8">

Financial Dashboard

</h1>

<div className="grid md:grid-cols-3 gap-5 mb-10">

<div className="p-6 rounded-3xl bg-cyan-500/20">

<p>Total Expenses</p>

<h1>

₹ {totalExpenses}

</h1>

</div>

<div className="p-6 rounded-3xl bg-purple-500/20">

<p>Transactions</p>

<h1>

{totalTransactions}

</h1>

</div>

</div>

<div className="grid lg:grid-cols-2 gap-8">

<div className="p-8 rounded-3xl bg-white/5">

<h2>

Add Expense

</h2>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input

name="title"

placeholder="Title"

value={formData.title}

onChange={handleChange}

required

className="w-full p-4 rounded-2xl text-black"

/>

<input

type="number"

name="amount"

placeholder="Amount"

value={formData.amount}

onChange={handleChange}

required

className="w-full p-4 rounded-2xl text-black"

/>

<select

name="category"

value={formData.category}

onChange={handleChange}

className="w-full p-4 rounded-2xl text-black"

>

<option>

Food

</option>

<option>

Travel

</option>

<option>

Shopping

</option>

<option>

Bills

</option>

<option>

Entertainment

</option>

<option>

Health

</option>

</select>

<input

type="date"

name="date"

value={formData.date}

onChange={handleChange}

required

className="w-full p-4 rounded-2xl text-black"

/>

<button

type="submit"

className="w-full bg-cyan-500 p-4 rounded-2xl"

>

Add Expense

</button>

</form>

</div>

<div>

<h2>

Expenses

</h2>

{

expenses.map(

expense=>(

<div

key={expense._id}

className="p-4 bg-white/5 rounded-xl mb-3"

>

<p>

{expense.title}

</p>

<p>

₹ {expense.amount}

</p>

<button

onClick={()=>

deleteExpense(

expense._id

)

}

>

Delete

</button>

</div>

)

)

}

</div>

</div>

</div>

</div>

);

};

export default Dashboard;