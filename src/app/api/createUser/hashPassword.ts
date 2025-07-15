import bcrypt from 'bcrypt';

export const hashPassword = async (value : string) => {
  const hashedPassword = await bcrypt.hash(value, 16)

  return hashedPassword
}