import { BASE_URL } from "./config";
export async function getDescription(inputString) {
  const api = `${BASE_URL}description?ticker=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching description data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
