import axios from "axios";
import { WATCHLIST_URL } from "./config";
export async function removeWatchlist(inputString) {
  const api = `${WATCHLIST_URL}remove?ticker=${inputString}`;
  try {
    const response = await axios.post(api);
    return response.data;
  } catch (error) {
    console.error("Error removing watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
