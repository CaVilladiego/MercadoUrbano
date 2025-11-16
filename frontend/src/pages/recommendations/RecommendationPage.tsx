// src/pages/recommendations/RecommendationPage.tsx
import { useState } from "react";
import Layout from "../../components/Layout";
import { useAuthStore } from "../../store/authStore";
import {
  createRecommendation,
  generateNearbyStores,
  type Recommendation,
} from "../../api/recommendations.api";

export default function RecommendationPage() {
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleCreate = async () => {
    setLoading(true);
    try {
      const response = await createRecommendation({ text });
      setResult(response);
    } catch {
      alert("Error al crear recomendación");
    }
    setLoading(false);
  };

  const handleGenerateNearby = async () => {
    setLoading(true);
    try {
      const response = await generateNearbyStores(user.id);
      setResult(response);
    } catch {
      alert("Error generando recomendaciones");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h2>Recomendaciones</h2>

      <div style={{ maxWidth: 600 }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe algo para generar una recomendación..."
          rows={4}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <button onClick={handleCreate} disabled={loading || !text}>
          {loading ? "Procesando..." : "Crear recomendación"}
        </button>

        <button
          onClick={handleGenerateNearby}
          disabled={loading}
          style={{ marginLeft: "1rem" }}
        >
          {loading ? "Procesando..." : "Recomendar sedes cercanas"}
        </button>
      </div>

      {result && (
        <div
          style={{
            background: "#1e1e1e",
            padding: "1rem",
            marginTop: "2rem",
            borderRadius: "8px",
          }}
        >
          <h3>Resultado</h3>
          <p><strong>Respuesta:</strong> {result.response}</p>
          <p><strong>Generado en:</strong> {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Layout>
  );
}
