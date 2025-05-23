import React, { useState } from "react";
import OrganizerForm from "../components/OrganizerForm";

export default function OrganizerList({ organizers, onAdd, onDelete }) {
  const [editing, setEditing] = useState(null);

  return (
    <div>
      {/* 
        Eğer düzenleme yoksa "Yeni Organizör" formu,
        varsa düzenlediğimiz organizatörle "Güncelle" formu göster. 
      */}
      {!editing ? (
        <OrganizerForm
          onSuccess={(created) => {
            if (created && created.company) {
              onAdd(created);
            } else {
              onAdd();
            }
          }}
        />
      ) : (
        <OrganizerForm
          organizer={editing}
          onSuccess={(updated) => {
            if (updated && updated.company) {
              onAdd({ company: updated.company, edited: true });
            } else {
              onAdd();
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="row g-3 mt-4">
        {organizers.map((o) => (
          <div className="col-md-6 col-lg-4" key={o._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">
                  <span className="badge bg-primary me-2">{o.company}</span>
                </h5>
                <div className="mb-2">
                  <span className="text-muted small">Telefon:</span>{" "}
                  {o.phone || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Adres:</span>{" "}
                  {o.address || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Email:</span>{" "}
                  {o.user?.email || <span className="text-secondary">-</span>}
                </div>
                <div className="mb-2">
                  <span className="text-muted small">Ad Soyad:</span>{" "}
                  {o.user?.profile?.firstName} {o.user?.profile?.lastName}
                </div>

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => setEditing(o)}
                  >
                    <i className="bi bi-pencil me-1"></i> Düzenle
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Silmek istediğinize emin misiniz?"))
                        onDelete(o._id);
                    }}
                  >
                    <i className="bi bi-trash me-1"></i> Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
