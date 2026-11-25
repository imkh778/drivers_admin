import { useMemo, useState } from "react";
import { drivers, getVehicle, tripsForDriver } from "../data.js";
import { formatDate, formatKm, initials } from "../format.js";
import { Drawer, PageHeader, SearchField, StatusPill } from "../ui.jsx";

export function Drivers({ driverId, onNavigate }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(driverId);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return [...drivers]
      .filter((driver) => {
        if (!needle) return true;
        const vehicle = getVehicle(driver.vehicleId);
        return (
          driver.name.toLowerCase().includes(needle) ||
          driver.hub.toLowerCase().includes(needle) ||
          (vehicle?.reg.toLowerCase().includes(needle) ?? false)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query]);

  const selected = drivers.find((driver) => driver.id === selectedId) ?? null;

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Driver management"
        lede="Profiles for the Bengaluru roster, with the vehicle assigned to each driver."
      />
      <div className="toolbar">
        <SearchField
          label="Search drivers"
          placeholder="Search by name, hub or vehicle"
          value={query}
          onChange={setQuery}
        />
      </div>
      <p className="result-count">{list.length} drivers</p>
      <div className="profile-grid">
        {list.map((driver) => {
          const vehicle = getVehicle(driver.vehicleId);
          return (
            <button type="button" className="profile" key={driver.id} onClick={() => setSelectedId(driver.id)}>
              <span className="profile-top">
                <span className="avatar lg" aria-hidden="true">{initials(driver.name)}</span>
                <span>
                  <strong>{driver.name}</strong>
                  <StatusPill value={driver.status} />
                </span>
              </span>
              <span className="profile-vehicle">{vehicle ? vehicle.reg : "No vehicle assigned"}</span>
              <span className="muted">{vehicle ? vehicle.model : "Standby"} · {driver.hub}</span>
              <span className="muted">{driver.phone}</span>
            </button>
          );
        })}
      </div>
      {list.length === 0 && (
        <div className="empty">
          <h2>No drivers match</h2>
          <p>Try Ramesh Gowda or Whitefield.</p>
        </div>
      )}
      {selected && (
        <Drawer title="Driver profile" onClose={() => setSelectedId(null)}>
          <DriverDetail driver={selected} onNavigate={onNavigate} />
        </Drawer>
      )}
    </>
  );
}

function DriverDetail({ driver, onNavigate }) {
  const vehicle = getVehicle(driver.vehicleId);
  const history = tripsForDriver(driver.id);

  return (
    <>
      <p className="detail-kicker">{driver.hub}</p>
      <h3 className="detail-title">{driver.name}</h3>
      <StatusPill value={driver.status} />
      <div className="detail-actions">
        {vehicle && (
          <>
            <button type="button" className="btn" onClick={() => onNavigate("vehicles", { vehicleId: vehicle.id })}>
              Assigned vehicle
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => onNavigate("tracking", { vehicleId: vehicle.id })}>
              Show on map
            </button>
          </>
        )}
      </div>
      <div className="vehicle-callout">
        <div className="muted">Assigned vehicle</div>
        <strong>{vehicle ? `${vehicle.reg} · ${vehicle.model}` : "Unassigned"}</strong>
        <div className="muted">
          {vehicle ? `${vehicle.status} · ${vehicle.location}` : `${driver.name.split(" ")[0]} is on standby at ${driver.hub}.`}
        </div>
      </div>
      <dl className="meta">
        <dt>Phone</dt>
        <dd>{driver.phone}</dd>
        <dt>Licence</dt>
        <dd>{driver.license}</dd>
        <dt>Licence expiry</dt>
        <dd>{formatDate(driver.licenseExpiry)}</dd>
        <dt>Experience</dt>
        <dd>{driver.experience}</dd>
        <dt>Joined</dt>
        <dd>{driver.joined}</dd>
        <dt>Trips in view</dt>
        <dd>{history.length}</dd>
      </dl>
      <h4 className="subhead">Trip history</h4>
      <ul className="mini-list">
        {history.length === 0 && <li className="muted">No trips in this sample.</li>}
        {history.map((trip) => (
          <li key={trip.id}>
            <button type="button" onClick={() => onNavigate("trips", { tripId: trip.id })}>
              <strong>{trip.pickup} → {trip.drop}</strong>
              <span className="muted">{formatDate(trip.date)} · {formatKm(trip.km)} · {trip.status}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
