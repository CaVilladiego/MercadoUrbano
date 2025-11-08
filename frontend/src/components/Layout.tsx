import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0d0d" }}>
      <Navbar />
      <main
        style={{
          padding: "2rem",
          maxWidth: "1100px",
          margin: "0 auto",
          color: "white",
        }}
      >
        {children}
      </main>
    </div>
  );
}
