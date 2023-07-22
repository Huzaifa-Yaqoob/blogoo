import { sign, verify } from "jsonwebtoken";

export const createToken = (id: string) => {
  return sign({ id }, process.env.AUTH_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

// Decode Token
export const decodeToken = (token: string): any => {
  let userID = null;
  verify(token, process.env.AUTH_TOKEN, (err, decodedToken: any) => {
    if (err) {
      throw new Error("TokenMissing");
    } else {
      console.log(decodeToken);
      userID = decodedToken.id;
    }
  });
  return userID;
};
