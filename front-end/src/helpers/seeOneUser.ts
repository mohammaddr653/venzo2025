//admin can see one user with this
import axios from "axios";
import { SERVER_URL } from "../../config";

export async function seeOneUser(userId: string) {
  try {
    const response = axios.get(SERVER_URL + `/admin/dashboard/users/${userId}`);
    return response;
  } catch (error: any) {
    throw error;
  }
}
