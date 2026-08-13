const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://localhost:8000";

    export async function getProductStats(){
        const response = await fetch(
            `${API_BASE_URL}/api/product/stats`
        );
        if(!response.ok){
            throw new Error("Failed to fetch product statistics")
        }
        return response.json()
    }