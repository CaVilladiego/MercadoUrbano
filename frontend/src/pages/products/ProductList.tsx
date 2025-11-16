import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../api/products.api";
import Layout from "../../components/Layout";
import AddToCartButton from "../../components/AddToCartButton";
import { useAuthStore } from "../../store/authStore";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      alert("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar si es vendedor
  const filteredProducts =
    user?.role === "seller"
      ? products.filter((p) => p.id_vendedor === user.id)
      : products;

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h2>Productos</h2>

        {user?.role === "seller" && (
          <button
            onClick={() => (window.location.href = "/products/new")}
            style={{
              background: "#d32f2f",
              border: "none",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            + Crear producto
          </button>
        )}
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendedor</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id_producto}>
                <td>{p.id_producto}</td>
                <td>{p.id_vendedor}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.estado ? "Activo" : "Inactivo"}</td>

                <td>
                  {user?.role === "buyer" && (
                    <AddToCartButton
                      productId={p.id_producto}
                      sellerId={p.id_vendedor}
                    />
                  )}

                  {user?.role === "seller" && (
                    <span style={{ color: "#aaa", fontSize: "14px" }}>
                      Solo visualización
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
