import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
export default function LoginCard() {
    
        const navigate = useNavigate();
        const [showPassword, setShowPassword] = useState(false);
        const [rememberMe, setRememberMe] = useState(false);
        const [formData, setFormData] =useState({
            email:"",
            password:""
        })
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const handleLogin = async () => {
            console.log("Login button clicked")
            try{
                setLoading(true);
                setError("");

                const result = await loginUser(formData);
                console.log("Backend Response:", result);
                if(result.success){

    if (rememberMe) {

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

    } else {

        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("user", JSON.stringify(result.user));

    }
                    navigate("/dashboard");
                }else{
                    setError(result.message);
                }
            }catch(err){
                console.log(err);
                setError("Login Failed");
            }finally{
                setLoading(false);
            }
        };

    return (

        <div className="w-full lg:w-[40%] flex items-center justify-center bg-[#0F172A]">

            <div className="w-[450px] rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-12 shadow-2xl">

                <h2 className="text-5xl font-black text-white">

                    Welcome Back

                </h2>

                <p className="mt-3 text-slate-400">

                    Login to continue

                </p>
                    {error && (
                        <p className="mt-4 text-red-500">
                            {error}
                        </p>
                    )}
                <div className="mt-10">

                    <label className="text-slate-300">

                        Email

                    </label>

                    <input

                        type="email"
                        name ="email"
                        value={formData.email}
                        onChange={(e) => setFormData({
                            ...formData,
                            email:e.target.value
                        })
                    }
                        className="mt-3 w-full rounded-xl bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

                <div className="mt-6">

                    <label className="text-slate-300">

                        Password

                    </label>

                    <div className="relative">

                        <input

                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }
                            className="mt-3 w-full rounded-xl bg-slate-800 p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"

                        />

                        <button

                            type="button"

                            onClick={() => setShowPassword(!showPassword)}

                            className="absolute right-5 top-8 text-slate-400"

                        >

                            {showPassword ? <FaEyeSlash/> : <FaEye/>}

                        </button>

                    </div>

                </div>

                <div className="mt-6 flex justify-between">

                    <label className="flex gap-2 text-slate-300">

                      <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
/>

<label>Remember Me</label>

                    </label>

                    <Link
                     to="/forgot-password"
                     className="text-blue-400 hover:text-blue-300"
                    >
                        Forgot Password?
                    </Link>

                </div>

                <button
                    onClick={handleLogin}
                    className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700 transition"

                >
                    {loading ? "Signing In..." : "Sign In"}
                    
                </button>

                <div className="my-8 flex items-center">

                    <div className="h-px flex-1 bg-slate-700"/>

                    <span className="mx-4 text-slate-500">

                        OR

                    </span>

                    <div className="h-px flex-1 bg-slate-700"/>

                </div>

                <button

                    className="w-full rounded-xl border border-slate-700 py-4 text-white flex justify-center items-center gap-3 hover:bg-slate-800 transition"

                >

                    <FaGoogle/>

                    Continue with Google

                </button>

                <p className="mt-8 text-center text-slate-400">

                    Don't have an account?

                   <Link
  to="/register"
  className="ml-2 text-blue-400 hover:text-blue-300"
>
  Register
</Link>

                </p>

            </div>

        </div>

    );

}