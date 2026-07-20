import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8000/api/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const result = await response.json();

            if (result.success) {

                navigate("/verify-otp", {
                    state: { email },
                });

            } else {

                setError(result.message);

            }

        } catch (err) {

            setError("Unable to send OTP");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#050816]">

            <div className="w-[450px] bg-[#0F172A] rounded-3xl p-10">

                <h1 className="text-4xl font-bold text-white">

                    Forgot Password

                </h1>

                <p className="text-slate-400 mt-2">

                    Enter your registered email.

                </p>

                {error && (

                    <p className="text-red-500 mt-4">

                        {error}

                    </p>

                )}

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    className="mt-8 w-full rounded-xl bg-slate-800 p-4 text-white"

                />

                <button

                    onClick={handleSubmit}

                    className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-white"

                >

                    {loading ? "Sending..." : "Send OTP"}

                </button>

            </div>

        </div>

    );

}