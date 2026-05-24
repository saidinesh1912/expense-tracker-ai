import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

const Settings = ({
  darkMode,
  setDarkMode,
}) => {

  const navigate =
    useNavigate();

  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  const [profilePic,
    setProfilePic] =
    useState("");

  const [selectedImage,
    setSelectedImage] =
    useState(null);

  // USER INITIAL

  const userInitial =
    userEmail
      ?.charAt(0)
      .toUpperCase();

  // LOGOUT

  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");

    };

  // DELETE ACCOUNT

  const deleteAccount =
    async () => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(

          `${API_URL}/api/auth/delete-account`,

          {

            data: {

              email:
                userEmail,

            },

          }

        );

        localStorage.clear();

        alert(
          "Account deleted successfully"
        );

        navigate("/");

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to delete account"
        );

      }

    };

  // SELECT IMAGE

  const handleImageChange =
    (e) => {

      setSelectedImage(
        e.target.files[0]
      );

    };

  // UPLOAD IMAGE

  const uploadProfilePic =
    async () => {

      if (
        !selectedImage
      ) {

        return alert(
          "Please select an image"
        );

      }

      try {

        const formData =
          new FormData();

        formData.append(

          "image",

          selectedImage

        );

        formData.append(

          "email",

          userEmail

        );

        const res =
          await axios.post(

            `${API_URL}/api/auth/upload-profile-pic`,

            formData

          );

        setProfilePic(

          res.data.profilePic

        );

        alert(

          "Profile picture uploaded successfully"

        );

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to upload image"
        );

      }

    };

  // REMOVE PHOTO

  const removeProfilePic =
    async () => {

      try {

        await axios.put(

          `${API_URL}/api/auth/remove-profile-pic`,

          {

            email:
              userEmail,

          }

        );

        setProfilePic("");

        alert(
          "Profile picture removed"
        );

      }

      catch (error) {

        console.log(
          error
        );

        alert(
          "Failed to remove profile picture"
        );

      }

    };

  return (

    <div
      className={`min-h-screen p-10 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-black via-zinc-950 to-purple-950 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-cyan-50 text-black"
      }`}
    >

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-3">

          Settings

        </h1>

        <p
          className={
            darkMode
              ? "text-zinc-400"
              : "text-gray-600"
          }
        >

          Manage your account and preferences

        </p>

      </div>

      <div
        className={`backdrop-blur-xl rounded-3xl p-8 mb-8 flex items-center gap-6 border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >

        {

          profilePic

          ?

          (

            <img

              src={profilePic}

              alt="Profile"

              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400"

            />

          )

          :

          (

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">

              {userInitial}

            </div>

          )

        }

        <div className="flex-1">

          <h2 className="text-3xl font-bold mb-2">

            Welcome Back 👋

          </h2>

          <p>

            {userEmail}

          </p>

          <input

            type="file"

            accept="image/*"

            onChange={
              handleImageChange
            }

            className="mb-4"

          />

          <div className="flex gap-4 flex-wrap">

            <button

              onClick={
                uploadProfilePic
              }

              className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-2xl font-bold text-white"

            >

              Upload Profile Picture

            </button>

            <button

              onClick={
                removeProfilePic
              }

              className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-2xl font-bold text-white"

            >

              Remove Photo

            </button>

          </div>

        </div>

      </div>

      <button

        onClick={
          handleLogout
        }

        className="w-full bg-red-500 p-4 rounded-2xl text-white font-bold mb-4"

      >

        Logout

      </button>

      <button

        onClick={
          deleteAccount
        }

        className="w-full bg-red-700 p-4 rounded-2xl text-white font-bold"

      >

        Delete Account

      </button>

    </div>

  );

};

export default Settings;