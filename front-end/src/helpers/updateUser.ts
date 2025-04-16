//admin can update one user with this
import axios from "axios";
import { SERVER_URL } from "../../config";

export async function updateUser(userId: string, data: any) {
  try {
    const response = axios.put(
      SERVER_URL + `/admin/dashboard/users/${userId}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}
