import { useAuthStore } from "../store/authStore";
import { addToCart } from "../api/cart.api";

interface Props {
  productId: string;
}

export default function AddToCartButton({ productId }: Props) {
  const { user } = useAuthStore();

  // Solo comprador puede agregar al carrito
  if (!user || user.role !== "buyer") return null;

  const handleAdd = async () => {
    await addToCart({
      userId: user.id,
      productId,
      quantity: 1,
    });

    alert("Producto agregado al carrito");
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        background: "#d32f2f",
        border: "none",
        color: "white",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      🛒 Agregar
    </button>
  );
}
