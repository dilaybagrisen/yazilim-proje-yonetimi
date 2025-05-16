import React, { useEffect, useState, useContext } from "react";
import { fetchOrganizers, deleteOrganizer } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import OrganizerList from "./OrganizerList";
import NotificationBell from "../components/NotificationBell";

export default function Dashboard() {
  const [organizers, setOrganizers] = useState([]);
  const [query, setQuery] = useState("");
  const { logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetchOrganizers();
    setOrganizers(res.data);
  };

  const filtered = organizers.filter((o) =>
    o.company.toLowerCase().includes(query.toLowerCase())
  );

  // Bildirim ekleme fonksiyonu
  const handleAddNotification = (msg) => {
    setNotifications((prev) => [msg, ...prev]);
  };

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h1 className="h3 fw-bold text-primary">Organizatörler</h1>
        <div className="d-flex align-items-center gap-3">
          <NotificationBell notifications={notifications} onClear={() => setNotifications([])} />
          <button className="btn btn-outline-danger" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i>Çıkış
          </button>
        </div>
      </header>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            className="form-control form-control-lg"
            placeholder="Organizatör ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary btn-lg" onClick={load}>
            <i className="bi bi-arrow-clockwise me-1"></i>Yenile
          </button>
        </div>
      </div>
      <OrganizerList
        organizers={filtered}
        onAdd={async (newOrg) => {
          await load();
          if (newOrg && newOrg.company) {
            handleAddNotification(`Yeni organizatör [${newOrg.company}] başarıyla oluşturuldu.`);
          }
        }}
        onDelete={async (id) => {
          await deleteOrganizer(id);
          load();
        }}
      />
    </div>
  );
}
