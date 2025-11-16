  import { atom } from "jotai";

export type User = {
  id: number;
  nombre?: string;
  email: string;
  rol: string;
};

export const authTokenAtom = atom<string | null>(null);
export const currentUserAtom = atom<User | null>(null);
