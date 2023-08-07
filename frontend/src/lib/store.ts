import { create } from "zustand";

type user = {
  email: string;
  username: string;
  token: string;
};

interface UserStore {
  user: user | null;
  isLogIn: boolean;
  setUser: (newUser: user | null) => void;
  setIsLogIn: (logInStatus: boolean) => void;
}

const User = localStorage.getItem("user");

export const useUserStore = create<UserStore>()((set) => ({
  user: User ? JSON.parse(User) : null,
  isLogIn: User ? true : false,
  setUser: (newUser) => set(() => ({ user: newUser })),
  setIsLogIn: (logInStatus) => set(() => ({ isLogIn: logInStatus })),
}));
