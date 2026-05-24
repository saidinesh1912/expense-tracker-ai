import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const API_URL =
  import.meta.env.VITE_API_URL;

const Signup = () => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      name: "",
      email: "",
      password: "",

    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          `${API_URL}/api/auth/signup`,

          formData

        );

        alert(
          "Signup Successful"
        );

        navigate("/");

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Signup Failed"
        );

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-purple-950 p-5">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold text-center text-purple-400 mb-3">

          Create Account

        </h1>

        <p className="text-zinc-400 text-center mb-10">

          Start managing your finances smartly

        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <input

            type="text"

            name="name"

            placeholder="Enter Name"

            value={
              formData.name
            }

            onChange={
              handleChange
            }

            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl outline-none text-white"

          />

          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl outline-none text-white"

          />

          <input

            type="password"

            name="password"

            placeholder="Enter Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl outline-none text-white"

          />

          <button
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-[1.02] transition duration-300 p-4 rounded-2xl font-bold text-white"
          >

            Signup

          </button>

        </form>

        <div className="flex items-center gap-3 my-8">

          <div className="flex-1 h-[1px] bg-white/10"></div>

          <p className="text-zinc-400 text-sm">

            OR

          </p>

          <div className="flex-1 h-[1px] bg-white/10"></div>

        </div>

        <button
          className="w-full bg-white text-black flex items-center justify-center gap-3 p-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
        >

          <FcGoogle
            size={25}
          />

          Sign up with Google

        </button>

        <p className="text-center text-zinc-400 mt-8">

          Already have an account?

          <Link

            to="/"

            className="text-purple-400 ml-2"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Signup;