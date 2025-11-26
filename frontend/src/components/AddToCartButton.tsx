import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { addToCart } from "../api/cart.api";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Solo comprador puede agregar al carrito
  if (!user || user.role !== "buyer") return null;

  const handleAdd = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await addToCart({
        userId: user.id,
        productId,
        quantity: 1,
      });

      alert("Producto agregado al carrito");
    } catch (error) {
      console.error(error);
      alert("Error al agregar al carrito");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      style={{
        background: loading ? "#999" : "#d32f2f",
        border: "none",
        color: "white",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Agregando..." : "🛒 Agregar"}
    </button>
  );
}
