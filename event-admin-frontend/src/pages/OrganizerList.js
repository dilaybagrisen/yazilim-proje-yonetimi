import React from "react";
import OrganizerForm from "../components/OrganizerForm";

export default function OrganizerList({ organizers, onAdd, onDelete }) {
  return (
    <div>
      <OrganizerForm onSuccess={onAdd} />
      <div className="row g-3">
        {organizers.map((o) => (
          <div className="col-md-6 col-lg-4" key={o._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-1">
                  <span className="badge bg-primary me-2">{o.company}</span>
                </h5>
                <div className="mb-2">
                  <span className="text-muted small">Telefon:</span> {o.phone || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Adres:</span> {o.address || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Email:</span> {o.user?.email || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Ad Soyad:</span> {o.user?.profile?.firstName} {o.user?.profile?.lastName}
                </div>
                <button
                  className="btn btn-outline-danger btn-sm mt-2 w-100"
                  onClick={() => {
                    if (window.confirm("Silmek istediğinize emin misiniz?")) onDelete(o._id);
                  }}
                >
                  <i className="bi bi-trash me-1"></i> Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
