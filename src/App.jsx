import { Routes, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditTask from "./pages/EditTask";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/edit-task/:id" element={<EditTask />} />    
    
    </Routes>
  );
}

export default App;