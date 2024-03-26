import { PORTFOLIO_URL } from "./config";
export async function getPortfolios() {
  const api = `${PORTFOLIO_URL}all`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all portfolio data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
