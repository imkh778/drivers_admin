import { useEffect, useState } from "react";
import { BrandMark, Icon } from "./icons.jsx";
import { cx } from "./format.js";
import { Dashboard } from "./views/Dashboard.jsx";
import { Vehicles } from "./views/Vehicles.jsx";
import { Drivers } from "./views/Drivers.jsx";
import { Tracking } from "./views/Tracking.jsx";
import { Trips } from "./views/Trips.jsx";
import { Fuel } from "./views/Fuel.jsx";
import { Reports } from "./views/Reports.jsx";
import "./App.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "vehicles", label: "Vehicles", icon: "truck" },
  { id: "drivers", label: "Drivers", icon: "users" },
  { id: "tracking", label: "Live tracking", icon: "pin" },
  { id: "trips", label: "Trips", icon: "route" },
  { id: "fuel", label: "Fuel", icon: "fuel" },
  { id: "reports", label: "Reports", icon: "file" },
];

const PAGES = NAV.map((item) => item.id);

function readPage() {
  const id = window.location.hash.replace(/^#/, "");
  return PAGES.includes(id) ? id : "dashboard";
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState({
    vehicleId: null,
    driverId: null,
    tripId: null,
    status: null,
    token: 0,
  });

  useEffect(() => {
    function onHash() {
      setPage(readPage());
      setOpen(false);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const current = NAV.find((item) => item.id === page);
    document.title = `${current?.label ?? "Fleet"} · Linehaul`;
  }, [page]);

  function navigate(next, extra = {}) {
    setFocus((current) => ({
      vehicleId: extra.vehicleId ?? null,
      driverId: extra.driverId ?? null,
      tripId: extra.tripId ?? null,
      status: extra.status ?? null,
      token: current.token + 1,
    }));
    setOpen(false);
    if (window.location.hash.replace(/^#/, "") !== next) {
      window.location.hash = next;
    }
    setPage(next);
  }

  return (
    <div className="app">
      {open && <button type="button" className="scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <aside className={cx("sidebar", open && "is-open")} aria-label="Primary">
        <div className="brand">
          <span className="brand-mark"><BrandMark /></span>
          <span>
            <strong>Admin</strong>
            <small>Fleet console</small>
          </span>
        </div>
        <nav className="nav">
          {NAV.map((item) => (
            <button
              type="button"
              key={item.id}
              className={cx("nav-btn", page === item.id && "is-active")}
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>
        <p className="side-foot">UI demo · sample data<br />Bengaluru operations</p>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="top-left">
            <button type="button" className="icon-btn nav-toggle" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Icon name="menu" />
            </button>
            <div className="top-date">Wednesday, 25 Nov 2026</div>
          </div>
          <div className="top-tools">
            <span className="hub-pill">Bengaluru</span>
            <span className="who">
              <span className="avatar" aria-hidden="true">AS</span>
              <span className="who-name">
                <strong>Ananya Sharma</strong>
                <small>Fleet admin</small>
              </span>
            </span>
          </div>
        </header>
        <main className="content">
          {page === "dashboard" && <Dashboard key={focus.token} onNavigate={navigate} />}
          {page === "vehicles" && (
            <Vehicles key={focus.token} vehicleId={focus.vehicleId} status={focus.status} onNavigate={navigate} />
          )}
          {page === "drivers" && <Drivers key={focus.token} driverId={focus.driverId} onNavigate={navigate} />}
          {page === "tracking" && <Tracking key={focus.token} vehicleId={focus.vehicleId} />}
          {page === "trips" && <Trips key={focus.token} tripId={focus.tripId} onNavigate={navigate} />}
          {page === "fuel" && <Fuel key={focus.token} onNavigate={navigate} />}
          {page === "reports" && <Reports key={focus.token} />}
        </main>
      </div>
    </div>
  );
}
