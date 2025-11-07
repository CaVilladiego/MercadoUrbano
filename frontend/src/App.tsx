import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";
import StoreList from "./pages/stores/StoreList";
import StoreForm from "./pages/stores/StoreForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:ownerId/stores"
          element={
            <ProtectedRoute>
              <StoreList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:ownerId/stores/new"
          element={
            <ProtectedRoute>
              <StoreForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:ownerId/stores/edit/:storeId"
          element={
            <ProtectedRoute>
              <StoreForm />
            </ProtectedRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
