import axios from "axios";
import { PORTFOLIO_URL } from "./config";
export async function removeSinglePortfolio(ticker) {
  const api = `${PORTFOLIO_URL}remove?ticker=${ticker}`;
  try {
    const response = await axios.post(api);

    return response;
  } catch (error) {
    console.error("Error fetching single portfolio data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
