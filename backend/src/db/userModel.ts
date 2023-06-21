import { User } from "./database";

export const addUser = async (data: object): Promise<void> => {
  console.log(data);
  await User.create(data);
};
