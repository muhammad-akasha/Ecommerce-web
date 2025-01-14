import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuthenticate } from "../context/userContext.auth";
import { useEffect, useState } from "react";
import { Spinner } from "../components/ui/spinner";
import { api } from "../axios-interceptor/axios";

export function Login() {
  const { user, setUser } = useAuthenticate();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErr("");
    const { email, password } = data;
    try {
      const res = await api.post("login", {
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("accesstoken", res.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to the home page if the user is logged in
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner className="w-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-sm mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

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
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {err && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded relative my-4">
            <span className="block">{err}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>

        {/* Sign up link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-700">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}
