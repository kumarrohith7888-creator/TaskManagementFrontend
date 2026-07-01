import { useState } from "react";
import API from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reset-password", {
        token: token,
        new_password: newPassword,
      });

      alert(res.data.message);

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Reset Failed");
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
        <h2 style={{ textAlign: "center" }}>Reset Password</h2>

        <form onSubmit={resetPassword}>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "20px",
              background: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;