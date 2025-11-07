import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div style={{ maxWidth: 600, margin: "3rem auto" }}>
      <h2>Bienvenido al Dashboard</h2>
      {user && (
        <>
          <p>
            Usuario: <strong>{user.name}</strong> ({user.email})
          </p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
}
