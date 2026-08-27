import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/userDashboard';
import OwnerDashboard from './pages/ownerDashboard';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <div>Unauthorized Access</div>;
  return children;
};

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav style={{ padding: '10px', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
      <span>Store Rating Portal</span>
      {user ? (
        <div>
          <span>Welcome, {user.name} ({user.role}) </span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute allowedRoles={['USER']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/owner" element={
            <ProtectedRoute allowedRoles={['STORE_OWNER']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div>Please Log in</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}