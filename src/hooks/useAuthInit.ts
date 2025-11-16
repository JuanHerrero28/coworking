// src/hooks/useAuthInit.ts
"use client";

import { useSetAtom } from "jotai";
import { authTokenAtom, currentUserAtom } from "@/context/authAtom";
import { useEffect } from "react";

export function useAuthInit() {
  const setToken = useSetAtom(authTokenAtom);
  const setUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));
    }
  }, [setToken, setUser]);
}
