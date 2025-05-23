import React, { useState } from "react";

export default function NotificationBell({ notifications = [], onClear }) {
  const [show, setShow] = useState(false);

  return (
    <div className="position-relative">
      <button
        type="button"
        className="btn btn-light position-relative"
        title="Bildirimler"
        onClick={() => setShow((v) => !v)}
      >
        <i className="bi bi-bell fs-4"></i>
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </button>
      {show && (
        <div
          className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow"
          style={{ minWidth: 260, zIndex: 100 }}
        >
          {notifications.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Bildirimler</span>
                <button
                  className="btn btn-sm btn-link text-danger p-0"
                  onClick={onClear}
                >
                  Temizle
                </button>
              </div>
              <ul
                className="list-unstyled mb-0"
                style={{ maxHeight: 200, overflowY: "auto" }}
              >
                {notifications.map((n, i) => (
                  <li key={i} className="mb-1 small">
                    <span role="img" aria-label="bell">
                      🔔
                    </span>{" "}
                    {n}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-secondary">Hiç bildiriminiz yok.</div>
          )}
        </div>
      )}
    </div>
  );
}
