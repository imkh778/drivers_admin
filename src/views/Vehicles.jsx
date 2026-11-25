import { useMemo, useState } from "react";
import { fuelForVehicle, getDriver, tripsForVehicle, vehicles } from "../data.js";
import { formatDate, formatKm, formatOdo, normReg } from "../format.js";
import { Chips, Drawer, PageHeader, SearchField, StatusPill } from "../ui.jsx";

const FILTERS = ["All", "On trip", "Active", "Idle", "Maintenance"];

export function Vehicles({ vehicleId, status, onNavigate }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(status || "All");
  const [selectedId, setSelectedId] = useState(vehicleId);

  const list = useMemo(() => {
    const needle = normReg(query);
    return [...vehicles]
      .filter((vehicle) => (filter === "All" ? true : vehicle.status === filter))
      .filter((vehicle) => (needle ? normReg(vehicle.reg).includes(needle) : true))
      .sort((a, b) => a.reg.localeCompare(b.reg));
  }, [query, filter]);

  const selected = vehicles.find((vehicle) => vehicle.id === selectedId) ?? null;

  return (
    <>
      <PageHeader
        eyebrow="Fleet"
        title="Vehicle management"
        lede="Search by registration number and open a vehicle for its driver, documents and recent work."
      />

      <div className="toolbar">
        <SearchField
          label="Search by registration number"
          placeholder="Search registration, e.g. KA 01 MJ 4821"
          value={query}
          onChange={setQuery}
        />
        <Chips options={FILTERS} value={filter} onChange={setFilter} label="Vehicle status" />
      </div>
      <p className="result-count" aria-live="polite">{list.length} vehicles</p>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Location</th>
              <th>Odometer</th>
            </tr>
          </thead>
          <tbody>
            {list.map((vehicle) => {
              const driver = getDriver(vehicle.driverId);
              return (
                <tr
                  key={vehicle.id}
                  className={selectedId === vehicle.id ? "is-selected" : undefined}
                  tabIndex={0}
                  onClick={() => setSelectedId(vehicle.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(vehicle.id);
                    }
                  }}
                >
                  <td className="reg">{vehicle.reg}</td>
                  <td>
                    {vehicle.model}
                    <div className="muted">{vehicle.type} · {vehicle.year}</div>
                  </td>
                  <td>
                    {driver ? (
                      <button
                        type="button"
                        className="linkish"
                        onClick={(event) => {
                          event.stopPropagation();
                          onNavigate("drivers", { driverId: driver.id });
                        }}
                      >
                        {driver.name}
                      </button>
                    ) : "Unassigned"}
                  </td>
                  <td><StatusPill value={vehicle.status} /></td>
                  <td>{vehicle.location}</td>
                  <td>{formatOdo(vehicle.odometer)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="empty">
            <h2>No vehicles match</h2>
            <p>Try KA 05 HN 7743, or clear the search.</p>
          </div>
        )}
      </div>

      {selected && (
        <Drawer title="Vehicle details" onClose={() => setSelectedId(null)}>
          <VehicleDetail vehicle={selected} onNavigate={onNavigate} />
        </Drawer>
      )}
    </>
  );
}

function VehicleDetail({ vehicle, onNavigate }) {
  const driver = getDriver(vehicle.driverId);
  const history = tripsForVehicle(vehicle.id).slice(0, 4);
  const fills = fuelForVehicle(vehicle.id).slice(0, 3);

  return (
    <>
      <p className="detail-kicker">{vehicle.depot}</p>
      <h3 className="detail-title">{vehicle.reg}</h3>
      <StatusPill value={vehicle.status} />
      <p className="lede">{vehicle.model} · {vehicle.type} · {vehicle.year}</p>
      <div className="detail-actions">
        <button type="button" className="btn" onClick={() => onNavigate("tracking", { vehicleId: vehicle.id })}>
          Show on map
        </button>
        {driver && (
          <button type="button" className="btn btn-ghost" onClick={() => onNavigate("drivers", { driverId: driver.id })}>
            Driver profile
          </button>
        )}
      </div>
      <dl className="meta">
        <dt>Driver</dt>
        <dd>{driver ? driver.name : "Unassigned"}</dd>
        <dt>Fuel</dt>
        <dd>{vehicle.fuelType}</dd>
        <dt>Capacity</dt>
        <dd>{vehicle.capacity}</dd>
        <dt>Location</dt>
        <dd>{vehicle.location}</dd>
        <dt>Odometer</dt>
        <dd>{formatOdo(vehicle.odometer)}</dd>
        <dt>Last service</dt>
        <dd>{formatDate(vehicle.lastService)}</dd>
        <dt>Insurance</dt>
        <dd>Valid till {formatDate(vehicle.insuranceUntil)}</dd>
        <dt>Fitness</dt>
        <dd>Valid till {formatDate(vehicle.fitnessUntil)}</dd>
      </dl>
      <h4 className="subhead">Recent trips</h4>
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
      <h4 className="subhead">Recent fuel</h4>
      <ul className="mini-list">
        {fills.length === 0 && <li className="muted">No fill-ups in this sample.</li>}
        {fills.map((fill) => (
          <li key={fill.id}>
            <strong>{fill.station}</strong>
            <span className="muted">{formatDate(fill.date)} · {fill.qty} {fill.unit}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
