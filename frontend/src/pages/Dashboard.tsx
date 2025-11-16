import Layout from "../components/Layout";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="dashboard">
        <h2>Bienvenido a Mercado Urbano</h2>

        {/* Mensaje según rol */}
        <p style={{ marginTop: "1rem", color: "#ccc" }}>
          {user?.role === "seller"
            ? "Desde este panel puedes administrar tus usuarios, tiendas y productos."
            : "Explora los productos disponibles y gestiona tu carrito de compras."}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Vendedor */}
          {user?.role === "seller" && (
            <>
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
                href={`/users/${user.id}/stores`}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#d32f2f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                🏬 Gestionar Tiendas
              </a>

              <a
                href="/products"
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
              >
                📦 Gestionar Productos
              </a>
            </>
          )}

          {/* Comprador */}
          {user?.role === "buyer" && (
            <>
              <a
                href="/products"
                style={{
                  background: "#d32f2f",
                  color: "white",
                  padding: "1rem 2rem",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                🛍 Ver Productos
              </a>

              <a
                href="/cart"
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#d32f2f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                🛒 Ver Carrito
              </a>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
