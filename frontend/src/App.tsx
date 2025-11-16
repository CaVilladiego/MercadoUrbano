import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";

import StoreList from "./pages/stores/StoreList";
import StoreForm from "./pages/stores/StoreForm";

import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";

import CartPage from "./pages/cart/CartPage";

import SellerRoute from "./components/role/SellerRoute";
import BuyerRoute from "./components/role/BuyerRoute";

import RecommendationPage from "./pages/recommendations/RecommendationPage";
import AdminRecommendationsList from "./pages/recommendations/AdminRecommendationsList";
import AdminRoute from "./components/role/AdminRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas (NO requieren login)  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas que requieren estar autenticado*/}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Venedor solamente */}

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <UserList />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <UserForm />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:ownerId/stores"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <StoreList />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:ownerId/stores/new"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <StoreForm />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:ownerId/stores/edit/:storeId"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <StoreForm />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <ProductForm />
              </SellerRoute>
            </ProtectedRoute>
          }
        />

        {/*  Rutas compartidas (Vendedor y Comprador) */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        {/* Solo comprador */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <BuyerRoute>
                <CartPage />
              </BuyerRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <RecommendationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminRecommendationsList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto*/}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
