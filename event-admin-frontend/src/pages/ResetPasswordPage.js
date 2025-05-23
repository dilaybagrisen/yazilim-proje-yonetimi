import React, { useState } from "react";
import { resetPassword } from "../api";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Token URL'den alınır
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    try {
      await resetPassword(token, password);
      setSuccess(true);
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
        <h2 className="mb-4 text-center">Yeni Şifre Belirle</h2>
        {success ? (
          <div className="alert alert-success">
            Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.
          </div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Yeni Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Yeni Şifre (Tekrar)"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Şifreyi Sıfırla
            </button>
          </>
        )}
      </form>
    </div>
  );
}
