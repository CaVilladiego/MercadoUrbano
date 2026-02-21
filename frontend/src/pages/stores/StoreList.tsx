import { useAuthStore } from "../../store/authStore";
import { useCallback, useEffect, useState } from "react";
import { getStores, deleteStore, type Store } from "../../api/stores.api";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

export default function StoreList() {
  const { user } = useAuthStore();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const { ownerId } = useParams();

  // Hooks siemrpe de primero
  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStores(ownerId!);
      setStores(data);
    } catch {
      alert("Error al cargar las tiendas");
    } finally {
      setLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Luego viene la validación
  if (!user || user.role !== "seller" || user.id !== ownerId) {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center", color: "#ccc" }}>
          ⚠ No tienes permisos para ver estas tiendas.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: "2rem auto", color: "#f5f5f5" }}>
        <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Mis Tiendas</h2>

        <button
          onClick={() => (window.location.href = `/users/${ownerId}/stores/new`)}
          style={{
            background: "#d32f2f",
            border: "none",
            color: "white",
            padding: "10px 18px",
            marginBottom: "1.5rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Nueva tienda
        </button>

        {loading ? (
          <p style={{ color: "#bbb" }}>Cargando tiendas...</p>
        ) : stores.length === 0 ? (
          <p style={{ color: "#bbb" }}>No tienes tiendas registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.address}</td>
                  <td>{store.phone || "-"}</td>
                  <td className="table-actions">
                    <button
                      className="edit"
                      onClick={() =>
                        (window.location.href = `/users/${ownerId}/stores/edit/${store.id}`)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteStore(ownerId!, store.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
