// this function deletes token cookie from server cause logout
import axios from "axios";
import { SERVER_URL } from "../../config";

export async function logout() {
  try {
    const response = await axios.get(SERVER_URL + "/token/logout");
    return response;
  } catch (error: any) {
    throw error;
  }
}
