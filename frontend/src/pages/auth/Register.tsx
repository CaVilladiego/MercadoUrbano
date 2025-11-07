import { useForm } from "react-hook-form";
import { register as registerUser } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

type RegisterFields = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterFields>();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values: RegisterFields) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const resp = await registerUser(values);
      setAuth(resp.token, resp.user);

      // Mensaje de éxito
      setSuccessMessage(
        "Registro exitoso. Te hemos enviado un correo de bienvenida a tu dirección de email."
      );

      // Limpieza del formulario y redirección después de unos segundos
      reset();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2500);
    } catch {
      setErrorMessage("Error al registrarse. Verifica tus datos.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Nombre completo" required />
        <input
          {...register("email")}
          type="email"
          placeholder="Correo electrónico"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>

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
