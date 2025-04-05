import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate("/admin-dashboard");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container flex-col gap-5 flex w-screen h-screen items-center justify-center">
      <div className="mb-5 flex flex-col justify-center items-center">
        <h3 className="text-7xl font-bold text-gray-700 text-center">
          Welcome Back
        </h3>
        <img src={Logo} alt="" className="w-60" />
        <p className="font-semibold text-gray-700">
          Complete Management Solution
        </p>
      </div>
      <div className="login-box w-98 bg-white px-5 py-5 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold pb-3">Login</h2>
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              className={`border w-full p-2 rounded-lg text-gray-800 font-semibold outline-amber-400 my-2 ${
                errors.email ? "border-red-500" : ""
              }`}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="form-group my-2">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              className={`border w-full p-2 rounded-lg text-gray-800 font-semibold outline-amber-400 my-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn cursor-pointer btn-primary w-full shadow p-2 rounded-lg text-white font-bold ${
              isLoading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="login-links flex justify-between my-2">
          <a
            href="#"
            className="inline text-blue-500 hover:text-blue-700 font-semibold underline"
          >
            Forget password
          </a>
          <p className="inline">
            Create Account
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer hover:text-blue-700 font-semibold underline"
            >
              {" "}
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
