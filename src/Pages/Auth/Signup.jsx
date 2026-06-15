import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/services/authApi";
import { setCredentials } from "../../redux/reducers/authSlice";
import logo from "../../../public/assets/logo.png";

function SignupField({ id, label, type = "text", placeholder, extra, value, onChange, error, showPassword }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={id === "password" || id === "confirmPassword" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm transition ${
            error ? "border-red-400 bg-red-50" : "border-brand-cream"
          } ${extra || ""}`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (form.password.length < 8) newErrors.password = "At least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
      newErrors.password = "Must contain uppercase, lowercase, and a number";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const result = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap();
      dispatch(setCredentials(result.data));
      if (result.data.refreshToken) {
        localStorage.setItem("brewbean_refresh_token", result.data.refreshToken);
      }
      toast.success(`Welcome to Brew & Bean, ${result.data.user.name.split(" ")[0]}!`);
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <img src={logo} alt="Brew & Bean" className="h-12" />
            <span className="text-2xl font-bold font-serif text-brand-dark">Brew & Bean</span>
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-brand-medium">Create your account</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-coffee p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <SignupField id="name" label="Full Name" placeholder="Your name" value={form.name} onChange={handleChange} error={errors.name} />
            <SignupField id="email" label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} />
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-brand-dark">Password</label>
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-xs text-brand-medium hover:text-brand-dark">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm transition ${errors.password ? "border-red-400 bg-red-50" : "border-brand-cream"}`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
            <SignupField id="confirmPassword" label="Confirm Password" placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} showPassword={showPassword} />

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-dark hover:bg-brand-espresso text-white rounded-xl font-semibold transition-colors disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-brand-medium mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-warm font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
