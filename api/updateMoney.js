import axios from "axios";
import { PORTFOLIO_URL } from "./config";
export async function updateMoney(data) {
  const api = `${PORTFOLIO_URL}money?quantity=${data}`;
  try {
    const response = await axios.post(api);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
