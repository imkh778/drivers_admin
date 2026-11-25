import { useEffect, useMemo, useState } from "react";
import { driverName, vehicles } from "../data.js";
import { cx, shortReg } from "../format.js";
import { Chips, PageHeader, StatusPill } from "../ui.jsx";

const FILTERS = ["All", "On trip", "Active", "Idle", "Maintenance"];

const MARKER = {
  "On trip": "#0e7c3a",
  Active: "#1f9d55",
  Idle: "#8d8d8d",
  Maintenance: "#b8893d",
};

const LABELS = [
  ["Yelahanka", 500, 42],
  ["Hebbal", 430, 128],
  ["Manyata", 690, 86],
  ["Peenya", 250, 168],
  ["Yeshwanthpur", 330, 230],
  ["Rajajinagar", 188, 336],
  ["Majestic", 455, 368],
  ["Indiranagar", 760, 268],
  ["Whitefield", 880, 188],
  ["KR Puram", 900, 300],
  ["Marathahalli", 860, 355],
  ["Koramangala", 520, 430],
  ["Jayanagar", 360, 455],
  ["HSR Layout", 700, 500],
  ["Banashankari", 188, 560],
  ["BTM Layout", 470, 545],
  ["Silk Board", 560, 575],
  ["Bellandur", 860, 455],
  ["Electronic City", 720, 650],
];

export function Tracking({ vehicleId }) {
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(vehicleId || "VH-01");

  useEffect(() => {
    if (!selectedId) return;
    document.getElementById(`track-${selectedId}`)?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  const list = useMemo(
    () => vehicles.filter((vehicle) => (filter === "All" ? true : vehicle.status === filter)),
    [filter],
  );
  const selected = vehicles.find((vehicle) => vehicle.id === selectedId) ?? null;

  return (
    <>
      <PageHeader
        eyebrow="Dispatch"
        title="Live tracking"
        lede="Sample positions across Bengaluru. Select a vehicle on the map or in the list."
      />
      <div className="toolbar">
        <Chips options={FILTERS} value={filter} onChange={setFilter} label="Show vehicles" />
      </div>
      <div className="track-layout">
        <div className="map-card">
          <svg className="map-svg" viewBox="0 0 1000 700" role="group" aria-label="Bengaluru schematic with vehicle positions">
            <rect width="1000" height="700" fill="#f4f7f5" />
            <ellipse cx="548" cy="148" rx="34" ry="16" fill="#d7e6e8" />
            <ellipse cx="655" cy="312" rx="22" ry="12" fill="#d7e6e8" />
            <ellipse cx="790" cy="430" rx="52" ry="26" fill="#d5e4e6" />
            <rect x="150" y="70" width="700" height="540" rx="210" fill="none" stroke="#d5ddd8" strokeWidth="16" />
            <path d="M500 30 V670" stroke="#c5cfc9" strokeWidth="7" fill="none" />
            <path d="M70 350 H930" stroke="#c5cfc9" strokeWidth="6" fill="none" />
            <path d="M500 350 L700 670" stroke="#c5cfc9" strokeWidth="5" fill="none" />
            <path d="M500 350 L900 200" stroke="#c5cfc9" strokeWidth="5" fill="none" />
            <path d="M180 180 L500 350" stroke="#c5cfc9" strokeWidth="5" fill="none" />
            <text x="500" y="64" textAnchor="middle" fill="#8a9690" fontSize="12" fontFamily="Manrope, Segoe UI, sans-serif">
              Outer Ring Road
            </text>
            {LABELS.map(([name, x, y]) => (
              <text key={name} x={x} y={y} fill="#66706b" fontSize="13" fontFamily="Manrope, Segoe UI, sans-serif">
                {name}
              </text>
            ))}
            {list.map((vehicle) => {
              const moving = vehicle.status === "On trip";
              const isSelected = vehicle.id === selectedId;
              return (
                <g
                  key={vehicle.id}
                  className={cx("marker", isSelected && "is-selected", moving && "is-moving")}
                  tabIndex={0}
                  role="button"
                  aria-label={`${vehicle.reg}, ${vehicle.location}, ${vehicle.status}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(vehicle.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(vehicle.id);
                    }
                  }}
                >
                  {moving && (
                    <circle className="marker-pulse" cx={vehicle.x} cy={vehicle.y} r="8" fill={MARKER[vehicle.status]} />
                  )}
                  {isSelected && (
                    <circle cx={vehicle.x} cy={vehicle.y} r="16" fill="none" stroke="#0e7c3a" strokeWidth="2" />
                  )}
                  <circle className="marker-dot" cx={vehicle.x} cy={vehicle.y} r="7" fill={MARKER[vehicle.status]} stroke="#fff" strokeWidth="2" />
                  {(isSelected || moving) && (
                    <g className="marker-label">
                      <rect x={vehicle.x + 12} y={vehicle.y - 14} rx="4" width={shortReg(vehicle.reg).length * 7.4 + 10} height="18" fill="#fff" stroke="#e6e6e6" />
                      <text x={vehicle.x + 17} y={vehicle.y - 1} fontSize="11" fill="#141414">
                        {shortReg(vehicle.reg)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="map-caption">
            <span>Bengaluru schematic · sample locations</span>
            <span className="legend-dots">
              <span><i className="swatch" style={{ background: MARKER["On trip"] }} /> On trip</span>
              <span><i className="swatch" style={{ background: MARKER.Active }} /> Active</span>
              <span><i className="swatch" style={{ background: MARKER.Idle }} /> Idle</span>
              <span><i className="swatch" style={{ background: MARKER.Maintenance }} /> Maintenance</span>
            </span>
          </div>
          {selected && (
            <div className="vehicle-callout" style={{ margin: 12 }}>
              <div className="track-top">
                <strong>{selected.reg}</strong>
                <StatusPill value={selected.status} />
              </div>
              <div>{selected.model} · {driverName(selected.driverId)}</div>
              <div className="muted">
                {selected.location} · {selected.speed > 0 ? `${selected.speed} km/h` : "Parked"} · {selected.ping}
              </div>
            </div>
          )}
        </div>
        <div className="track-list" aria-label="Vehicles on the map">
          {list.map((vehicle) => (
            <button
              type="button"
              id={`track-${vehicle.id}`}
              key={vehicle.id}
              className={cx("track-item", vehicle.id === selectedId && "is-selected")}
              onClick={() => setSelectedId(vehicle.id)}
            >
              <span className="track-top">
                <strong>{vehicle.reg}</strong>
                <StatusPill value={vehicle.status} />
              </span>
              <span>{driverName(vehicle.driverId)}</span>
              <span className="track-meta muted">
                <span>{vehicle.location}</span>
                <span>{vehicle.speed > 0 ? `${vehicle.speed} km/h` : vehicle.ping}</span>
              </span>
            </button>
          ))}
          {list.length === 0 && <div className="empty"><h2>Nothing in this filter</h2></div>}
        </div>
      </div>
    </>
  );
}
