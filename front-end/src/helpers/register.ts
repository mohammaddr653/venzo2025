import axios from "axios";
import { SERVER_URL } from "../../config";
import { RegisterForm } from "../types/objects/registerForm";

export async function register(data: RegisterForm) {
  try {
    const response = axios.post(SERVER_URL + "/auth/register", data);
    return response;
  } catch (error: any) {
    throw error;
  }
}
