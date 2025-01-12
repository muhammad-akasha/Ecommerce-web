import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
  profilePicture: FileList; // This will hold the profile picture file
};

const ProfileForm = () => {
  const [err, setErr] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null); // For image preview

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Handle form submission
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log(data);

      // Handle the form submission and file upload logic here
      // Example:
      // const formData = new FormData();
      // formData.append("username", data.username);
      // formData.append("email", data.email);
      // formData.append("password", data.password);
      // formData.append("profilePicture", data.profilePicture[0]);

      // Submit the form data (with image) to your API here
      // const response = await axios.post('/your-api-endpoint', formData);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Update Profile
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="block text-sm font-semibold text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            {...register("profilePicture")}
            onChange={handleImageChange} // Handle image change for preview
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
