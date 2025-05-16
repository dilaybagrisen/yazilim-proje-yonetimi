import React from "react";

export default function NotificationBell({ notifications = [], onClear }) {
  return (
    <div className="position-relative">
      <button
        type="button"
        className="btn btn-light position-relative"
        title="Bildirimler"
        onClick={onClear}
      >
        <i className="bi bi-bell fs-4"></i>
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </button>
      {/* Basit bir dropdown veya tooltip ile bildirimler gösterilebilir */}
    </div>
  );
}
