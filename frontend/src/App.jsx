// importer les extensions
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Importer la navbar
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";

// Public
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

// User
import UserDashboard from "./User/Dashboard";

// Admin
import AdminDashboard from "./Admin/Dashboard";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/home") ||
    location.pathname.startsWith("/dashboard/user");
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public routes */}
        <Route path="/home" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>

        {/* User routes */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
