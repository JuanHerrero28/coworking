"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { authTokenAtom, currentUserAtom } from "@/context/authAtom";

export function useProtectedRoute(adminOnly: boolean = false) {
  const token = useAtomValue(authTokenAtom);
  const user = useAtomValue(currentUserAtom);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (!token && !storedToken) {
      router.replace("/login");
      return;
    }

    if (adminOnly) {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (user?.rol !== "ADMIN" && parsedUser?.rol !== "ADMIN") {
        router.replace("/login");
      }
    }
  }, [token, user, router, adminOnly]);
}
