import { create } from "zustand";
import { UserStore } from "../types/states/userStore";

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));
export default useUserStore;
