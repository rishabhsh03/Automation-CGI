import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock
} from "react-icons/fa";

export default function RegisterCard() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

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

              <FaUser className="absolute left-4 top-5 text-slate-500"/>

              <input
                type="text"
                name="name"
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

              <FaEnvelope className="absolute left-4 top-5 text-slate-500"/>

              <input
                type="email"
                name="email"
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

              <FaPhone className="absolute left-4 top-5 text-slate-500"/>

              <input
                type="text"
                name="phone"
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

              <FaLock className="absolute left-4 top-5 text-slate-500"/>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-xl bg-slate-800 py-4 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-slate-400"
              >

                {showPassword ? <FaEyeSlash/> : <FaEye/>}

              </button>

            </div>

          </div>

          <button
            className="mt-4 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >

            Create Account

          </button>

        </form>

        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-slate-700"/>

          <span className="mx-4 text-slate-500">

            OR

          </span>

          <div className="h-px flex-1 bg-slate-700"/>

        </div>

        <button
          className="w-full rounded-xl border border-slate-700 py-4 text-white flex items-center justify-center gap-3 hover:bg-slate-800 transition"
        >

          <FaGoogle/>

          Continue with Google

        </button>

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