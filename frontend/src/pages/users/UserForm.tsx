import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, updateUser, type User } from "../../api/users.api";

export default function UserForm() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getUser(id).then((data) => {
        setValue("name", data.name);
        setValue("email", data.email);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: Partial<User>) => {
    try {
      setLoading(true);
      await updateUser(id!, data);
      alert("Usuario actualizado correctamente");
      window.location.href = "/users";
    } catch {
      alert("Error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Editar usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Nombre" />
        <input {...register("email")} placeholder="Correo" />
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
