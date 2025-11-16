// src/services/apiConfig.ts

// src/services/apiConfig.ts
export const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

export const getHeaders = (withAuth: boolean = false): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (withAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = token;
    }
  }

  return headers;
};

