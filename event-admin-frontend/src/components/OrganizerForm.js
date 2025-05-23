import React, { useState, useEffect } from "react";
import { createOrganizer, updateOrganizer } from "../api";

export default function OrganizerForm({ organizer, onSuccess, onCancel }) {
  const isEdit = Boolean(organizer);
  const [form, setForm] = useState({
    email: "",
    company: "",
    address: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  // organizer değiştiğinde formu doldur veya sıfırla
  useEffect(() => {
    if (isEdit) {
      setForm({
        email: organizer.user.email || "",
        company: organizer.company || "",
        address: organizer.address || "",
        phone: organizer.phone || "",
        firstName: organizer.user.profile.firstName || "",
        lastName: organizer.user.profile.lastName || "",
      });
    } else {
      setForm({
        email: "",
        company: "",
        address: "",
        phone: "",
        firstName: "",
        lastName: "",
      });
    }
  }, [organizer]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateOrganizer(organizer._id, form);
      onSuccess({ company: form.company });
    } else {
      await createOrganizer(form);
      onSuccess({ company: form.company });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      <h3 className="mb-3">
        {isEdit ? "Organizatörü Güncelle" : "Yeni Organizör Ekle"}
      </h3>

      <div className="row g-2">
        <div className="col-md-6">
          <input
            name="email"
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={isEdit}
          />
        </div>
        <div className="col-md-6">
          <input
            name="company"
            className="form-control mb-2"
            placeholder="Şirket"
            value={form.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="address"
            className="form-control mb-2"
            placeholder="Adres"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="phone"
            className="form-control mb-2"
            placeholder="Telefon"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="firstName"
            className="form-control mb-2"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            name="lastName"
            className="form-control mb-2"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-3 d-flex">
        <button type="submit" className="btn btn-success me-2 w-100">
          {isEdit ? "Güncelle" : "Ekle"}
        </button>
        {isEdit && onCancel && (
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={onCancel}
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
