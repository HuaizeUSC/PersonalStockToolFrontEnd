import { BASE_URL } from "./config";
export async function getTrends(inputString) {
  const api = `${BASE_URL}trends?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trends data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
