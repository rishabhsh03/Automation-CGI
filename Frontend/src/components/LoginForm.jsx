import { useState } from "react";

export default function LoginForm(){

    const [formData,setFormData]=useState({

        email:"",
        password:""

    });

    return(

        <div className="login-side">

            <div className="login-card">

                <h2>

                    Welcome Back 👋

                </h2>

                <p>

                    Sign in to continue

                </p>

                <input

                    placeholder="Email"

                    type="email"

                />

                <input

                    placeholder="Password"

                    type="password"

                />

                <button>

                    Sign In

                </button>

            </div>

        </div>

    )

}