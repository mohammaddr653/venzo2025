import axios from "axios";
import { SERVER_URL } from "../../config";

export async function getMe() {
  try {
    const response = await axios.get(SERVER_URL + "/token");
    return response;
  } catch (error: any) {
    throw error;
  }
}
