import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendResetMail = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/forgot-password", {
        email,
      });

      alert(response.data.message);
    } catch (err) {
      console.log(err);
      alert("Failed to send reset email");
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
        onSubmit={sendResetMail}
        style={{
          background: "white",
          padding: "35px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            color: "#2563eb",
            textAlign: "center",
          }}
        >
          Forgot Password
        </h2>

        <br />

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <br />
        <br />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Send Reset Email
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;