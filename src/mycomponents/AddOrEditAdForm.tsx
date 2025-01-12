import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const AddOrEditAdForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  err,
  heading,
}: any) => {
  const [preview, setPreview] = useState<string | null>(null); // For image preview
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
          {heading}
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <Input
            type="text"
            id="username"
            {...register("name", { required: "title is required" })}
            placeholder="enter your title"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <Input
            type="text"
            id="text"
            {...register("description", {
              required: "description is required",
            })}
            placeholder="Enter your description"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* price Field */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-700"
          >
            Price
          </label>
          <Input
            type="price"
            id="price"
            {...register("price", { required: "price is required" })}
            placeholder="Enter your price"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-semibold text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            id="profilePicture"
            {...register("image")}
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
          {heading}
        </Button>
      </div>
    </form>
  );
};

export default AddOrEditAdForm;
