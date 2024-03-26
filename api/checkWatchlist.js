import { WATCHLIST_URL } from "./config";
export async function checkWatchlist(inputString) {
  const api = `${WATCHLIST_URL}check?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching watchlist data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
