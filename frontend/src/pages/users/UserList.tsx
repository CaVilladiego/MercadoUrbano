import { useEffect, useState } from "react";
import { getUsers, deleteUser, type User } from "../../api/users.api";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (confirm("¿Desea eliminar este usuario?")) {
      try {
        await deleteUser(id);
        alert("Usuario eliminado");
        fetchUsers();
      } catch {
        alert("No se pudo eliminar");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Usuarios</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#1e1e1e",
            color: "#f5f5f5",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#d32f2f" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "10px" }}>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    onClick={() => (window.location.href = `/users/edit/${u.id}`)}
                    style={{
                      background: "transparent",
                      border: "1px solid #d32f2f",
                      color: "#d32f2f",
                      padding: "5px 10px",
                      marginRight: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{
                      background: "#d32f2f",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
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
  );
}
