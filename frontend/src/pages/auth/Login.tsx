import { useForm } from "react-hook-form";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

type LoginFields = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit, reset } = useForm<LoginFields>();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values: LoginFields) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const resp = await login(values);
      setAuth(resp.token, resp.user);

      // Mensaje de éxito
      setSuccessMessage("Bienvenido de nuevo. Has iniciado sesión correctamente.");

      // Limpia el formulario y redirige tras unos segundos
      reset();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch {
      setErrorMessage("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Entrar</button>
      </form>

      {/* Mensaje de éxito */}
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

      {/* Mensaje de error */}
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
        ¿No tienes una cuenta?{" "}
        <a href="/register" style={{ color: "#d32f2f", fontWeight: 600 }}>
          Regístrate aquí
        </a>
      </p>
    </div>
  );
}
