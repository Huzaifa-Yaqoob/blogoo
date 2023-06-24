export default function (err: any) {
  const myError: any = {};

  if (err.message === "InvalidId01") {
    myError["id"] = "Your ID is incorrect";
  }

  if (err.message === "EmailIncorrect") {
    myError["email"] = "User not found";
  }

  if (err.message === "PasswordUnmatched") {
    myError["password"] = "Your password is incorrect";
  }

  if (err.code === 11000) {
    myError["email"] = "This email has already been registered";
    return myError;
  }
  if (err.message.includes("validation failed")) {
    const error: any = Object.values(err.errors);
    error.forEach(({ properties }: any) => {
      myError[properties.path] = properties.message;
    });
  }
  return myError;
}
