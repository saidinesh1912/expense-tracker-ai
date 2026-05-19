import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const Settings = ({
  darkMode,
  setDarkMode,
}) => {

  const navigate = useNavigate();

  const userEmail =
    localStorage.getItem("userEmail");

  const [profilePic, setProfilePic] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  // USER INITIAL
  const userInitial =
    userEmail?.charAt(0).toUpperCase();

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  // DELETE ACCOUNT
  const deleteAccount = async () => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to permanently delete your account?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        "http://localhost:5000/api/auth/delete-account",
        {
          data: {
            email: userEmail,
          },
        }
      );

      localStorage.clear();

      alert(
        "Account deleted successfully"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Failed to delete account");
    }
  };

  // SELECT IMAGE
  const handleImageChange = (e) => {

    setSelectedImage(
      e.target.files[0]
    );
  };

  // UPLOAD IMAGE
  const uploadProfilePic = async () => {

    if (!selectedImage) {

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
          "http://localhost:5000/api/auth/upload-profile-pic",
          formData
        );

      setProfilePic(
        res.data.profilePic
      );

      alert(
        "Profile picture uploaded successfully"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to upload image"
      );
    }
  };

  // REMOVE PROFILE PIC
  const removeProfilePic = async () => {

    try {

      await axios.put(
        "http://localhost:5000/api/auth/remove-profile-pic",
        {
          email: userEmail,
        }
      );

      setProfilePic("");

      alert(
        "Profile picture removed"
      );

    } catch (error) {

      console.log(error);

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

      {/* HEADER */}

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

      {/* PROFILE CARD */}

      <div
        className={`backdrop-blur-xl rounded-3xl p-8 mb-8 flex items-center gap-6 border ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200 shadow-xl"
        }`}
      >

        {/* PROFILE IMAGE */}

        {
          profilePic ? (

            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-400"
            />

          ) : (

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">

              {userInitial}

            </div>
          )
        }

        {/* USER INFO */}

        <div className="flex-1">

          <h2 className="text-3xl font-bold mb-2">
            Welcome Back 👋
          </h2>

          <p
            className={`text-lg mb-4 ${
              darkMode
                ? "text-zinc-400"
                : "text-gray-600"
            }`}
          >
            {userEmail}
          </p>

          {/* IMAGE INPUT */}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

          {/* BUTTONS */}

          <div className="flex gap-4 flex-wrap">

            {/* UPLOAD */}

            <button
              onClick={uploadProfilePic}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition text-white"
            >
              Upload Profile Picture
            </button>

            {/* REMOVE */}

            <button
              onClick={removeProfilePic}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition text-white"
            >
              Remove Photo
            </button>

          </div>

        </div>

      </div>

      {/* SETTINGS GRID */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* ACCOUNT */}

        <div
          className={`backdrop-blur-xl rounded-3xl p-8 border ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Account
          </h2>

          <div className="space-y-5">

            <div
              className={`p-5 rounded-2xl border ${
                darkMode
                  ? "bg-black/30 border-white/10"
                  : "bg-gray-100 border-gray-200"
              }`}
            >

              <p
                className={
                  darkMode
                    ? "text-zinc-400 mb-1"
                    : "text-gray-600 mb-1"
                }
              >
                Email
              </p>

              <p className="text-lg break-all">
                {userEmail}
              </p>

            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.02] transition duration-300 p-4 rounded-2xl font-bold text-white"
            >
              Logout
            </button>

            {/* DELETE */}

            <button
              onClick={deleteAccount}
              className="w-full bg-gradient-to-r from-red-700 to-red-500 hover:scale-[1.02] transition duration-300 p-4 rounded-2xl font-bold text-white"
            >
              Delete Account
            </button>

          </div>

        </div>

        {/* APP SETTINGS */}

        <div
          className={`backdrop-blur-xl rounded-3xl p-8 border ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >

          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            App Preferences
          </h2>

          <div className="space-y-5">

            {/* THEME */}

            <div
              className={`p-5 rounded-2xl flex justify-between items-center border ${
                darkMode
                  ? "bg-black/30 border-white/10"
                  : "bg-gray-100 border-gray-200"
              }`}
            >

              <div>

                <p className="font-semibold">
                  Theme Mode
                </p>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-zinc-400"
                      : "text-gray-600"
                  }`}
                >
                  Dark / Light Mode
                </p>

              </div>

              <button

                onClick={() =>
                  setDarkMode(
                    !darkMode
                  )
                }

                className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-xl font-bold hover:scale-105 transition text-white"
              >

                {
                  darkMode
                    ? "🌙 Dark"
                    : "☀️ Light"
                }

              </button>

            </div>

            {/* AI */}

            <div
              className={`p-5 rounded-2xl border ${
                darkMode
                  ? "bg-black/30 border-white/10"
                  : "bg-gray-100 border-gray-200"
              }`}
            >

              <p className="font-semibold mb-2">
                AI Assistant
              </p>

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-zinc-400"
                    : "text-gray-600"
                }`}
              >
                AI-powered financial insights enabled
              </p>

            </div>

            {/* VERSION */}

            <div
              className={`p-5 rounded-2xl border ${
                darkMode
                  ? "bg-black/30 border-white/10"
                  : "bg-gray-100 border-gray-200"
              }`}
            >

              <p className="font-semibold mb-2">
                App Version
              </p>

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-zinc-400"
                    : "text-gray-600"
                }`}
              >
                ExpenseAI v1.0
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;