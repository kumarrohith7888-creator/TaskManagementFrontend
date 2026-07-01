import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import API from "../services/api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await API.post("/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
      
      return;

    } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Full Error:", error);

    alert("Login Failed");
}
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Task Management System
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginTop: "20px", textAlign: "center" }}>

  <p>
    <Link
      to="/forgot-password"
      style={{
        color: "#007bff",
        textDecoration: "none",
      }}
    >
      Forgot Password?
    </Link>
  </p>

  <p style={{ marginTop: "10px" }}>
    Don't have an account?{" "}
    <Link
      to="/register"
      style={{
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      Register
    </Link>
  </p>

</div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginTop:"20px"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginTop:"15px"
            }}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"10px",
              marginTop:"20px",
              background:"#007bff",
              color:"white",
              border:"none",
              cursor:"pointer"
            }}
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;