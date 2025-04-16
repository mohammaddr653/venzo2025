import { create } from "zustand";
import { UserStore } from "../types/states/userStore";

const useUserStore = create<UserStore>((set) => ({
  user: null,
  userLoading: true,
  setUserLoading: (value) => set({ userLoading: value }),
  setUser: (newUser) => set({ user: newUser }),
}));
export default useUserStore;
