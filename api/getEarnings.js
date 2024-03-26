import { BASE_URL } from "./config";
export async function getEarnings(inputString) {
  const api = `${BASE_URL}earnings?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
