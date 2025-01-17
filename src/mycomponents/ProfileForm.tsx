import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthenticate } from "../context/userContext.auth";
import Loading from "./Loading";
import { api } from "../axios-interceptor/axios";
import { imageToUrl } from "../firebase/firbaseconfig.js";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  email: string;
  password: string;
  profilePicture: FileList; // This will hold the profile picture file
};

const ProfileForm = () => {
  const [err, setErr] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null); // For image preview
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const { user, setUser } = useAuthenticate();
  const navigate = useNavigate();
  // Set form values when product details are fetched
  useEffect(() => {
    if (user) {
      setLoading(true);
      setValue("username", user.userName || "");
      setValue("email", user.email || "");
      setLoading(false);
    }
  }, [user, setValue]); // This runs whenever singleProduct changes

  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErr("");
    try {
      const formData: { [key: string]: string } = {};
      if (data.username) {
        formData.userName = data.username;
      }
      if (data.email) {
        formData.email = data.email;
      }
      if (data.password) {
        formData.password = data.password;
      }
      if (data.profilePicture[0]) {
        const url = await imageToUrl(data.profilePicture[0]);
        formData.image = url;
      }
      const response = await api.post("updateprofile", formData, {});

      console.log(response.data);
      setUser(response.data.updatedUser);
      reset();
      navigate("/");
    } catch (error: any) {
      // Handle any errors that occur during form submission
      setErr("An error occurred. Please try again.");
    }
  };

  // Handle profile picture preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-lg mx-auto my-20 mt-20 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Update Profile
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="mt-2 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:focus:ring-indigo-400"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="mt-2 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter your password"
            className="mt-2 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            {...register("profilePicture")}
            onChange={handleImageChange} // Handle image change for preview
            className="mt-2 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white dark:focus:ring-indigo-400"
            accept=".jpg,.png,.jpeg"
          />
        </div>

        {/* Display general errors (if any) */}
        {err && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded relative my-4">
            <span className="block">{err}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          {isSubmitting ? "Updating..." : " Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
