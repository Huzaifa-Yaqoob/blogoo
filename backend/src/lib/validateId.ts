import mongoose from "mongoose";

export default async function (id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("InvalidId01");
  }
}
