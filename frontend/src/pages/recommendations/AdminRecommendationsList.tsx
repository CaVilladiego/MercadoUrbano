import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  getAllRecommendations,
  type Recommendation,
} from "../../api/recommendations.api";
import { useAuthStore } from "../../store/authStore";

export default function AdminRecommendationsList() {
  const { user } = useAuthStore();
  const [list, setList] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  // No retornar nada si el usuario no es admin
  const isUnauthorized = !user || user.role !== "admin";

  const load = async () => {
    try {
      const data = await getAllRecommendations();
      setList(data);
    } catch {
      alert("Error al cargar recomendaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isUnauthorized) {
      load();
    }
  }, [isUnauthorized]);

  if (isUnauthorized) {
    return (
      <Layout>
        <p>No tienes permisos para ver esta página.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Recomendaciones generadas</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table style={{ width: "100%", background: "#1e1e1e", color: "#fff" }}>
          <thead>
            <tr style={{ background: "#d32f2f" }}>
              <th>ID</th>
              <th>Usuario</th>
              <th>Texto</th>
              <th>Respuesta</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {list.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.userId}</td>
                <td>{r.text}</td>
                <td>{r.response}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
