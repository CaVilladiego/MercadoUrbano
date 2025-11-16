import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  createProduct,
  type CreateProductPayload,
} from "../../api/products.api";
import Layout from "../../components/Layout";
import { useAuthStore } from "../../store/authStore";

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm<CreateProductPayload>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setError] = useState("");

  const { user } = useAuthStore();

  if (!user || user.role !== "seller") {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center", color: "#ccc" }}>
          ⚠ No tienes permisos para crear productos.
        </p>
      </Layout>
    );
  }

  const onSubmit = async (values: CreateProductPayload) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...values,
        id_vendedor: user.id,
        estado: true,
      };

      await createProduct(payload);
      setSuccess("Producto creado correctamente");
      reset();
    } catch {
      setError("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: 450, margin: "2rem auto" }}>
        <h2>Crear Producto</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("nombre")} placeholder="Nombre" required />
          <input {...register("descripcion")} placeholder="Descripción" required />
          <input
            {...register("precio", { valueAsNumber: true })}
            type="number"
            placeholder="Precio"
            required
          />
          <input
            {...register("stock", { valueAsNumber: true })}
            type="number"
            placeholder="Stock"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Crear producto"}
          </button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </Layout>
  );
}
