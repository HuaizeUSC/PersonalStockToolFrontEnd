import { WATCHLIST_URL } from "./config";
export async function getWatchlist() {
  const api = `${WATCHLIST_URL}/all`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
