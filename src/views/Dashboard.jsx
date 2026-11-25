import {
  MONTH_FUEL_TOTAL,
  activeVehicles,
  drivers,
  fleetAlerts,
  fuelByDay,
  trips,
  tripsByDay,
  tripsToday,
  vehicles,
  compareTrips,
  driverName,
  vehicleReg,
} from "../data.js";
import { formatInr, formatInrShort, formatKm } from "../format.js";
import { BarChart, PageHeader, StatusPill } from "../ui.jsx";

const MIX = [
  { status: "On trip", color: "#0e7c3a" },
  { status: "Active", color: "#7dcaa3" },
  { status: "Idle", color: "#d5d5d5" },
  { status: "Maintenance", color: "#c6a15b" },
];

export function Dashboard({ onNavigate }) {
  const mix = MIX.map((item) => ({
    ...item,
    count: vehicles.filter((vehicle) => vehicle.status === item.status).length,
  }));
  let cursor = 0;
  const stops = mix.map((item) => {
    const start = (cursor / vehicles.length) * 100;
    cursor += item.count;
    const end = (cursor / vehicles.length) * 100;
    return `${item.color} ${start}% ${end}%`;
  });
  const recent = [...trips].sort(compareTrips).slice(0, 6);
  const alerts = fleetAlerts();

  return (
    <>
      <PageHeader
        eyebrow="Bengaluru hub"
        title="Dashboard"
        lede="Wednesday, 25 November 2026. A sample view of vehicles, drivers, trips and fuel for the city fleet."
      />

      <section className="kpi-grid" aria-label="Fleet summary">
        <button type="button" className="kpi" onClick={() => onNavigate("vehicles")}>
          <div className="kpi-label">Total vehicles</div>
          <div className="kpi-value">{vehicles.length}</div>
          <div className="kpi-hint">Registered in Bengaluru</div>
        </button>
        <button type="button" className="kpi" onClick={() => onNavigate("vehicles")}>
          <div className="kpi-label">Active vehicles</div>
          <div className="kpi-value">{activeVehicles.length}</div>
          <div className="kpi-hint">On trip or available</div>
        </button>
        <button type="button" className="kpi" onClick={() => onNavigate("drivers")}>
          <div className="kpi-label">Drivers</div>
          <div className="kpi-value">{drivers.length}</div>
          <div className="kpi-hint">{drivers.filter((driver) => driver.status === "On duty").length} on duty</div>
        </button>
        <button type="button" className="kpi" onClick={() => onNavigate("trips")}>
          <div className="kpi-label">Trips</div>
          <div className="kpi-value">{tripsToday.length}</div>
          <div className="kpi-hint">Today, across the hub</div>
        </button>
        <button type="button" className="kpi" onClick={() => onNavigate("fuel")}>
          <div className="kpi-label">Fuel expenses</div>
          <div className="kpi-value">{formatInr(MONTH_FUEL_TOTAL)}</div>
          <div className="kpi-hint">1–25 November</div>
        </button>
      </section>

      <section className="section-grid">
        <article className="card">
          <div className="card-head">
            <h2>Trips</h2>
            <span>19–25 November</span>
          </div>
          <BarChart series={tripsByDay()} label="Trips from 19 to 25 November" />
        </article>
        <article className="card">
          <div className="card-head">
            <h2>Fuel spend</h2>
            <span>19–25 November</span>
          </div>
          <BarChart series={fuelByDay()} formatValue={formatInrShort} label="Fuel spend from 19 to 25 November" />
        </article>
      </section>

      <section className="dash-lower">
        <article className="card" style={{ padding: 0 }}>
          <div className="card-head" style={{ padding: "16px 16px 0" }}>
            <h2>Recent trips</h2>
            <button type="button" className="linkish" onClick={() => onNavigate("trips")}>Trip history</button>
          </div>
          <div className="table-wrap" style={{ border: 0 }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Trip</th>
                  <th>Route</th>
                  <th>Driver</th>
                  <th>Distance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((trip) => (
                  <tr key={trip.id} onClick={() => onNavigate("trips", { tripId: trip.id })}>
                    <td>
                      <div className="reg">{trip.id}</div>
                      <div className="muted">{vehicleReg(trip.vehicleId)}</div>
                    </td>
                    <td className="col-place">{trip.pickup} → {trip.drop}</td>
                    <td>{driverName(trip.driverId)}</td>
                    <td>{formatKm(trip.km)}</td>
                    <td><StatusPill value={trip.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="stack">
          <article className="card">
            <div className="card-head">
              <h2>Fleet mix</h2>
              <span>{vehicles.length} vehicles</span>
            </div>
            <div className="mix">
              <div className="mix-donut" style={{ background: `conic-gradient(${stops.join(",")})` }}>
                <span>{vehicles.length}<br />total</span>
              </div>
              <ul className="mix-legend">
                {mix.map((item) => (
                  <li key={item.status}>
                    <i className="swatch" style={{ background: item.color }} />
                    {item.status}
                    <strong>{item.count}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="card">
            <div className="card-head">
              <h2>Needs attention</h2>
            </div>
            {alerts.map((alert) => (
              <button
                type="button"
                className="alert"
                key={alert.id}
                onClick={() => onNavigate("vehicles", { vehicleId: alert.vehicleId })}
              >
                <strong>{alert.title}</strong>
                <span>{alert.body}</span>
              </button>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
