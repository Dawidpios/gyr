import bcrypt from "bcrypt";

export const comparePassword = async (password: string, dbPassword: string) => {
  const comparePassword = await bcrypt.compare(password, dbPassword);

  return comparePassword;
};
