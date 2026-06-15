import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import VoiceAssistant from "./Pages/AiFeatures/VoiceAssistant";
import PageLoader from "./Components/PageLoader";
import { selectIsAuthenticated, selectCurrentUser } from "./redux/reducers/authSlice";
import { NotificationPoller } from "./hooks/NotificationPoller";

// Lazy-loaded routes for code splitting
const Home = lazy(() => import("./Pages/Home/Home"));
const Eshop = lazy(() => import("./Pages/Eshop/E-shop"));
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const Checkout = lazy(() => import("./Pages/Payment/Checkout"));
const Login = lazy(() => import("./Pages/Auth/Login"));
const Signup = lazy(() => import("./Pages/Auth/Signup"));
const Profile    = lazy(() => import("./Pages/Auth/Profile"));
const AdminPanel = lazy(() => import("./Pages/Admin/AdminPanel"));

// Routes that hide the main Navbar/Footer (they have their own layout)
const NAVBAR_HIDDEN_ROUTES = new Set(["/menu", "/eshop", "/login", "/signup"]);

// Redirect authenticated users away from auth pages
const GuestRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

// Require authentication for protected pages
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Require admin role — redirects customers to home, guests to login
const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const AppWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVoiceCommand = (text) => {
    const command = text.toLowerCase();
    if (/menu|our brews|show menu/.test(command)) navigate("/menu");
    else if (/home|go home/.test(command)) navigate("/");
    else if (/cart|shopping cart|open cart/.test(command)) navigate("/cart");
    else if (/checkout|pay/.test(command)) navigate("/checkout");
    else if (/shop|e-shop|open shop/.test(command)) navigate("/eshop");
    else if (/login|sign in/.test(command)) navigate("/login");
    else toast.warn("Sorry, I didn't catch that command.");
  };

  const isAdminPath = location.pathname.startsWith("/admin");
  const hideNavbar  = NAVBAR_HIDDEN_ROUTES.has(location.pathname) || isAdminPath;


  return (
    <>
      <NotificationPoller />
      {!hideNavbar && <Navbar />}
      <VoiceAssistant onCommandDetected={handleVoiceCommand} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eshop" element={<Eshop />} />
          <Route path="/cart" element={<Navigate to="/eshop" replace />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <Signup />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!hideNavbar && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
