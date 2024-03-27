import axios from "axios";
import { WATCHLIST_URL } from "./config";
export async function updateWatchlist(data) {
  const api = `${WATCHLIST_URL}update`;
  try {
    const response = await axios.post(api, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
