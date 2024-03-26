import { BASE_URL } from "./config";
export async function getPeers(inputString) {
  const api = `${BASE_URL}peers?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching peers data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
