import { BASE_URL } from "./config";
export async function getAutoComplete(inputString) {
  const api = `${BASE_URL}autocomplete?q=${inputString}`;
  try {
    const response = await fetch(api);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    return { type: "error", message: "Backend server break down." };
  }
}
