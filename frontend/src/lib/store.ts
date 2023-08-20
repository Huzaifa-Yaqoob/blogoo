import { create } from "zustand";

type user = {
  email: string;
  username: string;
  token: string;
  isAdmin: boolean;
};

interface UserStore {
  user: user | null;
  isLogIn: boolean;
  // isAdmin: boolean;
  setUser: (newUser: user | null) => void;
  setIsLogIn: (logInStatus: boolean) => void;
  // setIsAdmin: (adminStatus: boolean) => void;
}

let User: any = localStorage.getItem("user");
User = JSON.parse(User);

export const useUserStore = create<UserStore>()((set) => ({
  user: User ? User : null,
  isLogIn: User ? true : false,
  // isAdmin: User ? User.isAdmin : false,
  setUser: (newUser) => set(() => ({ user: newUser })),
  setIsLogIn: (logInStatus) => set(() => ({ isLogIn: logInStatus })),
  // setIsAdmin: (adminStatus) => set(() => ({ isAdmin: adminStatus })),
}));
