import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { user, logout: clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        backgroundColor: "#181818",
        color: "white",
        padding: "0.8rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <h1
        style={{
          color: "#d32f2f",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        Mercado<span style={{ color: "white" }}>Urbano</span>
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: "#bbb" }}>
          {user ? user.name || user.email : ""}
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: "#d32f2f",
            border: "none",
            color: "white",
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
