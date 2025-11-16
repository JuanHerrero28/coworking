"use client";

import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/context/authAtom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const user = useAtomValue(currentUserAtom);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <>
      <Navbar />
      <main
        style={{
          position: "relative",
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#201F22",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            
          }}
        >
          <source src="/videos/video-coworking.mp4" type="video/mp4" />
        </video>

        {/* Contenido principal */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            borderRadius: "16px",
            maxWidth: "480px",
          }}
        >
          <h1
            style={{
              fontSize: "4.5rem",
              fontWeight: "700",
              color: "#201F22",
              marginBottom: "0.5rem",
              letterSpacing: "1.8px"
            }}
          >
            Space CO
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#555", letterSpacing: "2px" }}>
            Encontrá tu espacio
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Link href="/login">
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#a0c3ff",
                  color: "#201F22",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.8rem 2.5rem",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "0.8rem",
                  letterSpacing: "1.6px"
                }}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#201F22",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.8rem 2.5rem",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "0.8rem",
                  letterSpacing: "1.6px"
                }}
              >
                Registro
              </button>
            </Link>
          </div>
        </div>
      </main>
        <Footer/>
    </>
  );
}
