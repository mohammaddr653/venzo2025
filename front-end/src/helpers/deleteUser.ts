//admin can delete a user with this
import axios from "axios";
import { SERVER_URL } from "../../config";

export async function deleteUser(userId: string) {
  try {
    const response = axios.delete(
      SERVER_URL + `/admin/dashboard/users/${userId}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}
