import { BASE_URL } from "./config";
export async function getLatestPrice(inputString) {
  const api = `${BASE_URL}latestprice?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest price data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
