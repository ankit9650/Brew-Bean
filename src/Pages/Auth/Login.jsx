import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/services/authApi";
import { setCredentials } from "../../redux/reducers/authSlice";
import logo from "../../../public/assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const from = location.state?.from || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials(result.data));
      if (result.data.refreshToken) {
        localStorage.setItem("brewbean_refresh_token", result.data.refreshToken);
      }
      toast.success(`Welcome back, ${result.data.user.name.split(" ")[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password");
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
          <h2 className="mt-4 text-xl font-semibold text-brand-medium">Welcome back</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-coffee p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-warm text-sm transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-medium hover:text-brand-dark text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-dark hover:bg-brand-espresso text-white rounded-xl font-semibold transition-colors disabled:opacity-60"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-brand-medium mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-warm font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
