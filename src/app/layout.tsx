"use client";

import { GlobalStyle } from "@/styles/globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { authTokenAtom } from "@/context/authAtom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";

// 👇 Este componente maneja el layout condicional
function LayoutContent({ children }: { children: ReactNode }) {
  const token = useAtomValue(authTokenAtom);
  const pathname = usePathname();

  // Páginas donde NO debe mostrarse el Navbar
  const hideNavbar = pathname === "/login" || pathname === "/signup" || !token;

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
