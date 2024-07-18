import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { hash, compare } from "bcrypt-ts";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Função para hash de senha
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 5;
  return await hash(password, saltRounds);
};

// Função para comparar senha
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};
