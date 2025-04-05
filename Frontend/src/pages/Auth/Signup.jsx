import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {  
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }
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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      // Create user data object without confirmPassword
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      const result = await signup(userData);
      
      if (result.success) {
        navigate("/admin-dashboard");
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container flex flex-col mb-5 w-screen h-screen items-center justify-center">
      
      <div className="mb-5 flex flex-col justify-center items-center">
        <h3 className="text-7xl font-bold text-gray-700 text-center">
          Welcome To
        </h3>
        <img src={Logo} alt="" className="w-60" />
        <p className="font-semibold text-gray-700">
          Complete Management Solution
        </p>
      </div>
      <div className="login-box w-98 bg-white px-4 py-5 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold pb-3">Create Account</h2>
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Enter Full Name:</label>
            <br />
            <input
              className={`border w-full p-2 rounded-lg text-gray-800 font-semibold outline-amber-400 my-2 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter Full Name"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter Email:</label>
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
              placeholder="Enter Email"
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
              placeholder="Enter Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="form-group my-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <br />
            <input
              className={`border w-full p-2 rounded-lg text-gray-800 font-semibold outline-amber-400 my-2 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary w-full shadow p-2 rounded-lg text-white font-bold ${
              isLoading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
            } cursor-pointer`}
          >
            {isLoading ? "Creating Account..." : "SignUp"}
          </button>
        </form>
        <p className="py-2 text-center">
          Already have account
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold underline"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
