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

  useEffect(() => {
    if (!user || user.role !== "buyer") return;

    const load = async () => {
      try {
        setLoading(true);
        const data = await getCart(user.id);
        setCart(data);
      } catch {
        console.log("Carrito vacío o no existe.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, setCart]);

  if (!user) {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          Necesitas iniciar sesión para ver tu carrito.
        </p>
      </Layout>
    );
  }

  if (user.role !== "buyer") {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center" }}>
          ⚠ Solo los compradores pueden ver el carrito.
        </p>
      </Layout>
    );
  }

  const handleQuantity = async (item: CartItem, qty: number) => {
    if (qty < 1) return;

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

  return (
    <Layout>
      <h2 style={{ marginBottom: "1.5rem" }}>🛒 Tu Carrito</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : !cart || cart.items.length === 0 ? (
        <p style={{ marginTop: "2rem" }}>Tu carrito está vacío.</p>
      ) : (
        <>
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
                    <button onClick={() => handleQuantity(item, item.quantity - 1)}> - </button>
                    {item.quantity}
                    <button onClick={() => handleQuantity(item, item.quantity + 1)}> + </button>
                  </td>

                  <td>${item.subtotal}</td>

                  <td>
                    <button onClick={() => handleDelete(item)}>🗑 Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "2rem", textAlign: "right", fontSize: "18px", fontWeight: 600 }}>
            Total: ${cart.total}
          </div>
        </>
      )}
    </Layout>
  );
}
