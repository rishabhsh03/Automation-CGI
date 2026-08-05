import API_BASE_URL from "../config/api";

const API = `${API_BASE_URL}/api/auth`;

export const registerUser = async (userData) => {
        const response = await fetch(`${API}/register`, {
            method:"POST",
            headers:{
                "Content-type":"application/json",

            },
            body:JSON.stringify(userData),
        });

        return await response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API}/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(credentials),
    })
    return await response.json();
}