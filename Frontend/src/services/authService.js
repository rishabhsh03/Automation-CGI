
const API = "http://localhost:8000/api/auth";

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