import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  getCart,
  updateQuantity,
  removeFromCart,
  type CartItem,
} from "../../api/cart.api";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const { user } = useAuthStore();
  const { cart, setCart } = useCartStore();

  const [loading, setLoading] = useState(true);

  // Los hooks SIEMPRE van primero
  useEffect(() => {
    if (!user || user.role !== "buyer") return;

    const load = async () => {
      setLoading(true);
      try {
        const data = await getCart(user.id);
        setCart(data);
      } catch {
        console.log("El carrito está vacío o aún no existe.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, setCart]);

  // Retornos condicionales
  if (!user) {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center", color: "#ccc" }}>
          Necesitas iniciar sesión para ver tu carrito.
        </p>
      </Layout>
    );
  }

  if (user.role !== "buyer") {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center", color: "#ccc" }}>
          ⚠ Solo los compradores pueden ver el carrito.
        </p>
      </Layout>
    );
  }

  // Funciones del carrito
  const handleQuantity = async (item: CartItem, qty: number) => {
    if (qty < 0) return;

    const updated = await updateQuantity({
      userId: user.id,
      productId: item.productId,
      quantity: qty,
    });

    setCart(updated);
  };

  const handleDelete = async (item: CartItem) => {
    const updated = await removeFromCart(user.id, item.productId);
    setCart(updated);
  };

  // Render final
  return (
    <Layout>
      <h2 style={{ marginBottom: "1.5rem" }}>🛒 Tu Carrito</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : !cart || cart.items.length === 0 ? (
        <p style={{ marginTop: "2rem", color: "#bbb" }}>
          Tu carrito está vacío.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cart.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.nombre}</td>
                <td>${item.precio}</td>

                <td>
                  <button
                    style={{
                      marginRight: "6px",
                      padding: "2px 8px",
                      borderRadius: "5px",
                      background: "#333",
                      border: "1px solid #555",
                      color: "white",
                    }}
                    onClick={() => handleQuantity(item, item.quantity - 1)}
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    style={{
                      marginLeft: "6px",
                      padding: "2px 8px",
                      borderRadius: "5px",
                      background: "#333",
                      border: "1px solid #555",
                      color: "white",
                    }}
                    onClick={() => handleQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </td>

                <td>${item.subtotal}</td>

                <td>
                  <button
                    style={{
                      background: "#d32f2f",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    onClick={() => handleDelete(item)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart && cart.items.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "right",
            fontSize: "18px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Total: ${cart.total}
        </div>
      )}
    </Layout>
  );
}
