import { useState } from "react";
import API from "../services/api";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reset-password", {
        token,
        new_password: newPassword,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Reset Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Reset Password</h1>

      <form onSubmit={resetPassword}>

        <input
          type="text"
          placeholder="Reset Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Reset Password
        </button>

      </form>
    </div>
  );
}

export default ResetPassword;