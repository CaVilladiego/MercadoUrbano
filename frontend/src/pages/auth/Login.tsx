import { useForm } from "react-hook-form";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/authStore";

type LoginFields = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFields>();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (values: LoginFields) => {
    try {
      const resp = await login(values);
      setAuth(resp.token, resp.user);
      alert("Inicio de sesión exitoso ✅");
      window.location.href = "/dashboard";
    } catch (err) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("Error desconocido");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Correo electrónico" />
        <input
          {...register("password")}
          placeholder="Contraseña"
          type="password"
        />
        <button type="submit">Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
}
