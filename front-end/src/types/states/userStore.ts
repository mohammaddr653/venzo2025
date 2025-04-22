import { User } from "../objects/user";

export interface UserStore {
  user: User | null;
  setUser: (newUser: User | null) => void;
}
