import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

export default function RegisterCard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "STAFF",
    organization_id: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await registerUser(formData);

      console.log("Register Response:", result);

      if (result.success) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error(err);
      setError("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full lg:w-2/5 items-center justify-center bg-[#0F172A]">
      <div className="w-[480px] rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">
        <h2 className="text-5xl font-black text-white">
          Create Account
        </h2>

        <p className="mt-3 text-slate-400">
          Start managing your warehouse today.
        </p>

        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* Name */}

          <div>
            <label className="text-slate-300">
              Full Name
            </label>

            <div className="relative mt-2">
              <FaUser className="absolute left-4 top-5 text-slate-500" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl bg-slate-800 py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="text-slate-300">
              Email
            </label>

            <div className="relative mt-2">
              <FaEnvelope className="absolute left-4 top-5 text-slate-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                className="w-full rounded-xl bg-slate-800 py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="text-slate-300">
              Phone
            </label>

            <div className="relative mt-2">
              <FaPhone className="absolute left-4 top-5 text-slate-500" />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-xl bg-slate-800 py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-slate-300">
              Password
            </label>

            <div className="relative mt-2">
              <FaLock className="absolute left-4 top-5 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-xl bg-slate-800 py-4 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-slate-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Role */}

          <div>
            <label className="text-slate-300">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl bg-slate-800 py-4 px-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="STAFF">Staff</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700" />

          <span className="mx-4 text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}