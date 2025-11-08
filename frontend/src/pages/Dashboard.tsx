import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="dashboard">
        <h2>Bienvenido a Mercado Urbano</h2>
        <p style={{ marginTop: "1rem", color: "#ccc" }}>
          Desde este panel puedes administrar tus <strong>usuarios</strong> y{" "}
          <strong>tiendas</strong>.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2.5rem",
          }}
        >
          <a
            href="/users"
            style={{
              background: "#d32f2f",
              color: "white",
              padding: "1rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.2s ease-in-out",
            }}
          >
            👥 Gestionar Usuarios
          </a>

          <a
            href="/users/1/stores"
            style={{
              background: "transparent",
              border: "2px solid #d32f2f",
              color: "#d32f2f",
              padding: "1rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d32f2f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            🏬 Gestionar Tiendas
          </a>
        </div>
      </div>
    </Layout>
  );
}
