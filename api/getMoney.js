import { PORTFOLIO_URL } from "./config";
export async function getMoney() {
  const api = `${PORTFOLIO_URL}money`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching money data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
