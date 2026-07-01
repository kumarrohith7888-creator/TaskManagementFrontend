import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", user);

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      <form
        onSubmit={registerUser}
        style={{
          background: "white",
          padding: "35px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ color: "#2563eb", textAlign: "center" }}>
          Create Account
        </h2>

        <br />

        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) =>
            setUser({ ...user, username: e.target.value })
          }
          style={inputStyle}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
          style={inputStyle}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          style={inputStyle}
        />

        <br /><br />

        <select
          value={user.role}
          onChange={(e) =>
            setUser({ ...user, role: e.target.value })
          }
          style={inputStyle}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

export default Register;