import axios from "axios";
import { SERVER_URL } from "../../config";
import { LoginForm } from "../types/objects/loginForm";

export async function login(data:LoginForm) {
  try {
    const response = await axios.post(SERVER_URL + "/auth/login", data);
    return response;
  } catch (error: any) {
    throw error;
  }
}
