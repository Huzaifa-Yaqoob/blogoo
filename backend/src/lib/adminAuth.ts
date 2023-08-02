import { Admin } from "../db/database";

export default async (id: string) => {
  const admin = await Admin.findOne({ user_id: id });
  if (!admin) {
    return null;
  }
  return admin._id.toString();
};
