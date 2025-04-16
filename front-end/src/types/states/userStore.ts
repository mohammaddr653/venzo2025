import { User } from "../objects/user";

export interface UserStore {
  user: User | null;
  userLoading: boolean;
  setUserLoading: (value: boolean) => void;
  setUser: (newUser: User | null) => void;
}
