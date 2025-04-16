//gets all users from api
import axios from "axios";
import { SERVER_URL } from "../../config";
export async function getUsers() {
  try {
    const response = axios.get(SERVER_URL + "/admin/dashboard/users");
    return response;
  } catch (error: any) {
    throw error;
  }
}
