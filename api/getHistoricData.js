import { BASE_URL } from "./config";
export async function getHistorcData(inputString) {
  const api = `${BASE_URL}historicdata?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching historic data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
