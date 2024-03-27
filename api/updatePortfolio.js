import axios from "axios";
import { PORTFOLIO_URL } from "./config";
export async function updatePortfolio(data) {
  const api = `${PORTFOLIO_URL}update`;
  try {
    const response = await axios.post(api, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
