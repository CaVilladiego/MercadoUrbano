import { useCallback, useEffect, useState } from "react";
import { getStores, deleteStore, type Store } from "../../api/stores.api";
import { useParams } from "react-router-dom";

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const { ownerId } = useParams();

  // Cargar tiendas
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

  // Eliminar tienda
  const handleDelete = async (storeId: string) => {
    if (confirm("¿Desea eliminar esta tienda?")) {
      try {
        await deleteStore(ownerId!, storeId);
        alert("Tienda eliminada correctamente");
        fetchStores();
      } catch {
        alert("No se pudo eliminar la tienda");
      }
    }
  };

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
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
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#d32f2f", color: "white" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Nombre</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Dirección</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Teléfono</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.id}
                style={{
                  borderBottom: "1px solid #333",
                  transition: "background 0.2s",
                }}
              >
                <td style={{ padding: "12px" }}>{store.name}</td>
                <td style={{ padding: "12px" }}>{store.address}</td>
                <td style={{ padding: "12px" }}>{store.phone || "-"}</td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      (window.location.href = `/users/${ownerId}/stores/edit/${store.id}`)
                    }
                    style={{
                      background: "transparent",
                      border: "1px solid #d32f2f",
                      color: "#d32f2f",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(store.id)}
                    style={{
                      background: "#d32f2f",
                      border: "none",
                      color: "white",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
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
  );
}
