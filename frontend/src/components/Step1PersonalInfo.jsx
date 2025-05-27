/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Step1PersonalInfo = ({ formData, setFormData, errors, setErrors }) => {
  const [preview, setPreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");

  const baseURL = import.meta.env.VITE_API_URL;

  // Check username availability from backend
  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/users/check-username-availability?username=${encodeURIComponent(
          username
        )}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error("Error checking username:", error.message);
      return false;
    }
  };

  // Password validation rules
  const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    let valid = true;
    let message = "";

    if (!lengthRegex.test(password)) {
      valid = false;
      message = "Password must be at least 8 characters.";
    } else if (!specialCharRegex.test(password)) {
      valid = false;
      message = "Password must contain at least 1 special character.";
    } else if (!numberRegex.test(password)) {
      valid = false;
      message = "Password must contain at least 1 number.";
    }

    return { valid, message };
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      default:
        return "";
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePhoto: file }));

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      const isAvailable = await checkUsernameAvailability(value);
      setErrors((prev) => ({
        ...prev,
        username: isAvailable
          ? ""
          : "Username is already used. Please try a new one.",
      }));
    }

    if (name === "newPassword") {
      const { valid, message } = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        newPassword: valid ? "" : message,
      }));
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 mt-20">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Step 1: Personal Info
      </h2>

      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.profilePhoto && (
          <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>
        )}
        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-full border border-gray-300"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          New Password{" "}
          <span className="text-gray-400">
            (8+ chars, 1 special char, 1 number)
          </span>
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
            errors.newPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
        )}

        {/* Password strength meter */}
        {formData.newPassword && !errors.newPassword && (
          <div className="mt-1">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className={`h-2 rounded ${
                  passwordStrength === "Weak"
                    ? "bg-red-500 w-1/3"
                    : passwordStrength === "Medium"
                    ? "bg-yellow-400 w-2/3"
                    : passwordStrength === "Strong"
                    ? "bg-green-500 w-full"
                    : "w-0"
                }`}
              ></div>
            </div>
            <p
              className={`text-xs font-semibold mt-1 ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
