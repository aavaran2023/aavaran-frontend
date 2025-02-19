import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const postDataToApi = async (endpoint, payload) => {
    try {
        const requestBody = JSON.stringify({ data: payload });  // Ensure correct structure

        console.log("Request Body:", requestBody); // Debugging

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
            body: requestBody,  // Ensure JSON format
        });

        const responseText = await res.text();  // Capture response for debugging
        console.log("Raw Response:", responseText);  

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${responseText}`);
        }

        return JSON.parse(responseText); // Return parsed JSON response
    } catch (error) {
        console.error("Error posting data:", error.message);
        throw error;
    }
};
