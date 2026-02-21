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

  tiendaName: string;
  tiendaTelefono: string;
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
  Tiendas: Array<{
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
  const { register, handleSubmit, reset } = useForm<RegisterFields>();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      Tiendas: [
        {
          name: values.tiendaName,
          telefono: values.tiendaTelefono,
          email: values.tiendaEmail,
          description: values.tiendaDescription,
          direccion: values.tiendaDireccion,
          ciudad: values.tiendaCiudad,
          departamento: values.tiendaDepartamento,
          pais: values.tiendaPais,
          codigoPostal: values.tiendaCodigoPostal,
          referencia: values.tiendaReferencia,
        },
      ],
    };

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
    <div style={{ maxWidth: 900, margin: "3rem auto" }}>
      <h2>Registro</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "1.5rem",
          width: "100%",
        }}
      >
        {/* ---------------------- COLUMNA IZQUIERDA ---------------------- */}
        <div>
          <h3>Datos Personales</h3>
          <h4>(Tanto para clientes como para vendedores)</h4>

          <select {...register("Rol")} required style={{ padding: "10px", borderRadius: "4px", width: "100%" }}>
            <option value="">Selecciona un rol</option>
            <option value="Cliente">Cliente</option>
            <option value="Vendedor">Vendedor</option>
          </select>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input {...register("PrimerNombre")} placeholder="Primer Nombre" required style={{ flex: 1 }} />
            <input {...register("Apellido")} placeholder="Apellido" required style={{ flex: 1 }} />
          </div>

          <input {...register("email")} type="email" placeholder="Correo electrónico" required style={{ marginTop: "10px" }} />
          <input {...register("password")} type="password" placeholder="Contraseña" required style={{ marginTop: "10px" }} />

          <input {...register("Telefono")} placeholder="Teléfono" required style={{ marginTop: "10px" }} />
          <input {...register("Direccion")} placeholder="Dirección" required style={{ marginTop: "10px" }} />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input {...register("Ciudad")} placeholder="Ciudad" required style={{ flex: 1 }} />
            <input {...register("Departamento")} placeholder="Departamento" required style={{ flex: 1 }} />
          </div>

          <input {...register("Pais")} placeholder="País" required style={{ marginTop: "10px" }} />
        </div>

        {/* ---------------------- COLUMNA DERECHA ---------------------- */}
        <div>
          <h3>Datos de la Tienda</h3>
          <h4>(Solo validos para vendedores)</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <input {...register("tiendaName")} placeholder="Nombre de la tienda"  style={{ flex: 1 }} />
            <input {...register("tiendaTelefono")} placeholder="Teléfono de la tienda"  style={{ flex: 1 }} />
          </div>

          <input {...register("tiendaEmail")} placeholder="Email tienda" style={{ marginTop: "10px" }} />
          <input {...register("tiendaDescription")} placeholder="Descripción" style={{ marginTop: "10px" }} />

          <input {...register("tiendaDireccion")} placeholder="Dirección tienda" style={{ marginTop: "10px" }} />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input {...register("tiendaCiudad")} placeholder="Ciudad tienda" style={{ flex: 1 }} />
            <input {...register("tiendaDepartamento")} placeholder="Departamento tienda" style={{ flex: 1 }} />
          </div>

          <input {...register("tiendaPais")} placeholder="País tienda" style={{ marginTop: "10px" }} />
          <input {...register("tiendaCodigoPostal")} placeholder="Código Postal" style={{ marginTop: "10px" }} />
          <input {...register("tiendaReferencia")} placeholder="Referencia" style={{ marginTop: "10px" }} />
        </div>

        <button type="submit" style={{ gridColumn: "1 / span 2", marginTop: "20px" }}>
          Registrarse
        </button>
      </form>

      {/* Mensajes */}
      {successMessage && (
        <p style={{ marginTop: "1rem", color: "#4caf50", backgroundColor: "#1e1e1e", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p style={{ marginTop: "1rem", color: "#f44336", backgroundColor: "#1e1e1e", padding: "10px", borderRadius: "6px", textAlign: "center" }}>
          {errorMessage}
        </p>
      )}

      <p style={{ marginTop: "1rem" }}>
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" style={{ color: "#d32f2f", fontWeight: 600 }}>
          Inicia sesión
        </a>
      </p>
    </div>
  );
}
