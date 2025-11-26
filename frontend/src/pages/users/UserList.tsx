import { useAuthStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, type User } from "../../api/users.api";
import Layout from "../../components/Layout";

export default function UserList() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Hooks siempre antes del return condicional
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Validación después de hooks
  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <p style={{ marginTop: "2rem", textAlign: "center", color: "#ccc" }}>
          ⚠ No tienes permisos para ver usuarios.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: 800, margin: "2rem auto" }}>
        <h2>Usuarios</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td className="table-actions">
                    <button
                      className="edit"
                      onClick={() => (window.location.href = `/users/edit/${u.id}`)}
                    >
                      Editar
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteUser(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
