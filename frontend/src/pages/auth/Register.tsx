import { useForm } from "react-hook-form";
import { register as registerUser } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

type RegisterFields = {
  PrimerNombre: string;
  Apellido: string;
  email: string;
  password: string;
  Telefono: string;
  Direccion: string;
  Ciudad: string;
  Departamento: string;
  Pais: string;

  Rol: "Cliente" | "Vendedor";

  tiendaName?: string;
  tiendaTelefono?: string;
  tiendaEmail?: string;
  tiendaDescription?: string;
  tiendaDireccion?: string;
  tiendaCiudad?: string;
  tiendaDepartamento?: string;
  tiendaPais?: string;
  tiendaCodigoPostal?: string;
  tiendaReferencia?: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  PrimerNombre: string;
  Apellido: string;
  Telefono: string;
  Direccion: string;
  Ciudad: string;
  Departamento: string;
  Pais: string;
  Rol: "Cliente" | "Vendedor";
  Tiendas?: Array<{
    name: string;
    telefono: string;
    email?: string;
    description?: string;
    direccion?: string;
    ciudad?: string;
    departamento?: string;
    pais?: string;
    codigoPostal?: string;
    referencia?: string;
  }>;
};

export default function Register() {
  const { register, handleSubmit, watch, reset } = useForm<RegisterFields>();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedRole = watch("Rol");

  const onSubmit = async (values: RegisterFields) => {
    setErrorMessage("");
    setSuccessMessage("");

    const payload: RegisterPayload = {
      email: values.email,
      password: values.password,
      PrimerNombre: values.PrimerNombre,
      Apellido: values.Apellido,
      Telefono: values.Telefono,
      Direccion: values.Direccion,
      Ciudad: values.Ciudad,
      Departamento: values.Departamento,
      Pais: values.Pais,
      Rol: values.Rol,
    };

    if (values.Rol === "Vendedor") {
      payload.Tiendas = [
        {
          name: values.tiendaName!,
          telefono: values.tiendaTelefono!,
          email: values.tiendaEmail,
          description: values.tiendaDescription,
          direccion: values.tiendaDireccion,
          ciudad: values.tiendaCiudad,
          departamento: values.tiendaDepartamento,
          pais: values.tiendaPais,
          codigoPostal: values.tiendaCodigoPostal,
          referencia: values.tiendaReferencia,
        },
      ];
    }

    try {
      const resp = await registerUser(payload);
      setAuth(resp.token, resp.user);

      setSuccessMessage("Registro exitoso. Te hemos enviado un correo de bienvenida.");
      reset();

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2500);
    } catch {
      setErrorMessage("Error al registrarse. Verifica tus datos.");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "3rem auto" }}>
      <h2>Registro</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        {/* Rol */}
        <select
          {...register("Rol")}
          required
          style={{ padding: "10px", borderRadius: "4px" }}
        >
          <option value="">Selecciona un rol</option>
          <option value="Cliente">Cliente</option>
          <option value="Vendedor">Vendedor</option>
        </select>

        {/* Nombre */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            {...register("PrimerNombre")}
            placeholder="Primer Nombre"
            required
            style={{ flex: 1 }}
          />
          <input
            {...register("Apellido")}
            placeholder="Apellido"
            required
            style={{ flex: 1 }}
          />
        </div>

        <input {...register("email")} type="email" placeholder="Correo electrónico" required />
        <input {...register("password")} type="password" placeholder="Contraseña" required />

        {/* Contacto */}
        <input {...register("Telefono")} placeholder="Teléfono" required />

        {/* Dirección */}
        <input {...register("Direccion")} placeholder="Dirección" required />
        <div style={{ display: "flex", gap: "10px" }}>
          <input {...register("Ciudad")} placeholder="Ciudad" required style={{ flex: 1 }} />
          <input
            {...register("Departamento")}
            placeholder="Departamento"
            required
            style={{ flex: 1 }}
          />
        </div>
        <input {...register("Pais")} placeholder="País" required />

        {/* ✔ Campos solo si es vendedor */}
        {selectedRole === "Vendedor" && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#1e1e1e",
              borderRadius: "8px",
            }}
          >
            <h4>Datos de la Tienda</h4>

            <input {...register("tiendaName")} placeholder="Nombre de la tienda" required />
            <input {...register("tiendaTelefono")} placeholder="Teléfono de la tienda" required />
            <input {...register("tiendaEmail")} placeholder="Email tienda" />
            <input {...register("tiendaDescription")} placeholder="Descripción" />

            <input {...register("tiendaDireccion")} placeholder="Dirección tienda" />

            <div style={{ display: "flex", gap: "10px" }}>
              <input {...register("tiendaCiudad")} placeholder="Ciudad tienda" style={{ flex: 1 }} />
              <input
                {...register("tiendaDepartamento")}
                placeholder="Departamento tienda"
                style={{ flex: 1 }}
              />
            </div>

            <input {...register("tiendaPais")} placeholder="País tienda" />
            <input {...register("tiendaCodigoPostal")} placeholder="Código Postal" />
            <input {...register("tiendaReferencia")} placeholder="Referencia" />
          </div>
        )}

        <button type="submit">Registrarse</button>
      </form>

      {/* Mensajes */}
      {successMessage && (
        <p
          style={{
            marginTop: "1rem",
            color: "#4caf50",
            backgroundColor: "#1e1e1e",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p
          style={{
            marginTop: "1rem",
            color: "#f44336",
            backgroundColor: "#1e1e1e",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </p>
      )}

      <p>
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" style={{ color: "#d32f2f", fontWeight: 600 }}>
          Inicia sesión
        </a>
      </p>
    </div>
  );
}
