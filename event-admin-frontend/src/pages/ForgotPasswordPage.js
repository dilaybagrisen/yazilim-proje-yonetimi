import React, { useState } from "react";
import { forgotPassword } from "../api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Bir hata oluştu");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow bg-white"
        style={{ minWidth: 320 }}
      >
        <h2 className="mb-4 text-center">Şifremi Unuttum</h2>
        {sent ? (
          <div className="alert alert-success">
            Şifre sıfırlama bağlantısı e-posta ile gönderildi.
          </div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Gönder
            </button>
          </>
        )}
      </form>
    </div>
  );
}
