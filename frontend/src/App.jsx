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
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const hideNavbar = location.pathname.startsWith("/home");

  let layoutClass = "";
  if (!hideNavbar) {
    if (token && role === "user") layoutClass = "layout-sidebar";
    else if (token && role === "admin") layoutClass = "layout-sidebar";
  }

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div className={layoutClass}>
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
      </div>
    </>
  );
}

export default App;
