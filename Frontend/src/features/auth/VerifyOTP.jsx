import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function VerifyOTP() {

    const { state } = useLocation();

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8000/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: state.email,
                        otp
                    })
                }
            );

            const result = await response.json();

            if(result.success){

                alert("OTP Verified");

            }else{

                alert(result.message);

            }

        }catch(err){

            console.log(err);

        }finally{

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#050816]">

            <div className="w-[430px] rounded-3xl bg-[#0F172A] p-10 shadow-xl">

                <h1 className="text-4xl font-bold text-white">

                    Verify OTP

                </h1>

                <p className="mt-3 text-slate-400">

                    Enter the 6-digit OTP sent to

                </p>

                <p className="text-green-400 font-medium">

                    {state?.email}

                </p>

                <input

                    type="text"

                    maxLength={6}

                    value={otp}

                    onChange={(e)=>setOtp(e.target.value)}

                    placeholder="Enter OTP"

                    className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-center text-2xl tracking-[10px] text-white outline-none"

                />

                <button

                    onClick={handleVerify}

                    className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"

                >

                    {loading ? "Verifying..." : "Verify OTP"}

                </button>

            </div>

        </div>

    );

}