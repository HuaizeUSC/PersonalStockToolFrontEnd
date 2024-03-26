import { BASE_URL } from "./config";
export async function getInsiderSentiment(inputString) {
  const api = `${BASE_URL}insidersentiment?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
