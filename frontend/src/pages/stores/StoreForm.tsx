import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createStore, updateStore, getStore, type Store } from "../../api/stores.api";
import { useEffect } from "react";

export default function StoreForm() {
  const { ownerId, storeId } = useParams();
  const { register, handleSubmit, setValue } = useForm<Store>();
  const navigate = useNavigate();

  useEffect(() => {
  if (storeId) {
    getStore(ownerId!, storeId).then((data) => {
      setValue("name", data.name);
      setValue("address", data.address);
      setValue("phone", data.phone || "");
    });
  }
}, [storeId, ownerId, setValue]);

  const onSubmit = async (data: Partial<Store>) => {
    try {
      if (storeId) {
        await updateStore(ownerId!, storeId, data);
        alert("Tienda actualizada correctamente");
      } else {
        await createStore(ownerId!, data);
        alert("Tienda creada correctamente");
      }
      navigate(`/users/${ownerId}/stores`);
    } catch {
      alert("Error al guardar la tienda");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>{storeId ? "Editar Tienda" : "Nueva Tienda"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Nombre de la tienda" required />
        <input {...register("address")} placeholder="Dirección" required />
        <input {...register("phone")} placeholder="Teléfono" />
        <button type="submit">{storeId ? "Guardar cambios" : "Crear tienda"}</button>
      </form>
    </div>
  );
}
