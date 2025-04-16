//admin can register users with this
import axios from "axios";
import { SERVER_URL } from "../../config";
import { RegisterForm } from "../types/objects/registerForm";

export async function createUser(data: RegisterForm) {
  try {
    const response = axios.post(SERVER_URL + "/admin/dashboard/users", data);
    return response;
  } catch (error: any) {
    throw error;
  }
}
