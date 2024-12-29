import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const PrivateRoute = ({ isAuth, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuth) {
    return navigate("/login", { state: { from: location }, replace: true });
  }

  return children;
};

function App() {
  const token = localStorage.getItem("token"); 

  return (
    <div>
      <Routes>
        <Route index element={<PrivateRoute isAuth={!!token}><Home /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
