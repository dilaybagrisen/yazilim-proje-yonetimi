import React, { useState } from "react";
import { createOrganizer, updateOrganizer } from "../api";

export default function OrganizerForm({ organizer, onSuccess }) {
  const isEdit = Boolean(organizer);
  const [form, setForm] = useState({
    email: organizer?.user?.email || "",
    company: organizer?.company || "",
    address: organizer?.address || "",
    phone: organizer?.phone || "",
    firstName: organizer?.user?.profile?.firstName || "",
    lastName: organizer?.user?.profile?.lastName || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateOrganizer(organizer._id, form);
    } else {
      await createOrganizer(form);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      <h3 className="mb-3">{isEdit ? "Düzenle" : "Yeni"} Organizör</h3>
      <div className="row g-2">
        <div className="col-md-6">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-control mb-2"
            type="email"
          />
        </div>
        <div className="col-md-6">
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Şirket"
            required
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-6">
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Adres"
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-6">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefon"
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-6">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Ad"
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-6">
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Soyad"
            className="form-control mb-2"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-2 w-100">
        {isEdit ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}
