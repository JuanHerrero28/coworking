"use client";

import { GlobalStyle } from "@/styles/globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";
import { authTokenAtom } from "@/context/authAtom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";

// 👇 Este componente maneja el layout condicional SIN usePathname
function LayoutContent({ children }: { children: ReactNode }) {
  const token = useAtomValue(authTokenAtom);

  // 👇 FIX: evitar el bug del "undefined/" en producción
  const isAuthPage =
    typeof window !== "undefined" &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/signup");

  const hideNavbar = isAuthPage || !token;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <GlobalStyle />
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <LayoutContent>{children}</LayoutContent>
            </AuthProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={true}
              closeOnClick
              pauseOnHover
              draggable
              toastClassName="custom-toast"
            />
          </QueryClientProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
