import { BASE_URL } from "./config";
export async function getNews(inputString) {
  const api = `${BASE_URL}news?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
