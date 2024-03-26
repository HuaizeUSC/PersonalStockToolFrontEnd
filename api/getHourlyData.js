import { BASE_URL } from "./config";
export async function getHourlyData(inputString) {
  const api = `${BASE_URL}historicdatahour?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hourly data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
