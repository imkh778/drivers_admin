import { useMemo, useState } from "react";
import { TODAY, compareTrips, driverName, trips, vehicleReg } from "../data.js";
import { duration, formatDate, formatKm, formatWindow } from "../format.js";
import { Chips, Drawer, PageHeader, SearchField, StatusPill } from "../ui.jsx";

const FILTERS = ["All", "Today", "This week", "Earlier"];

function inFilter(trip, filter) {
  if (filter === "Today") return trip.date === TODAY;
  if (filter === "This week") return trip.date >= "2026-11-23" && trip.date <= TODAY;
  if (filter === "Earlier") return trip.date < "2026-11-23";
  return true;
}

export function Trips({ tripId, onNavigate }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(tripId);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return [...trips]
      .filter((trip) => inFilter(trip, filter))
      .filter((trip) => {
        if (!needle) return true;
        return (
          trip.pickup.toLowerCase().includes(needle) ||
          trip.drop.toLowerCase().includes(needle) ||
          trip.id.toLowerCase().includes(needle) ||
          vehicleReg(trip.vehicleId).toLowerCase().includes(needle) ||
          driverName(trip.driverId).toLowerCase().includes(needle)
        );
      })
      .sort(compareTrips);
  }, [filter, query]);

  const selected = trips.find((trip) => trip.id === selectedId) ?? null;
  const distance = list.reduce((sum, trip) => sum + trip.km, 0);

  return (
    <>
      <PageHeader
        eyebrow="Movement"
        title="Trip management"
        lede="Pickup, drop and distance for the sample history. Open a row for the full trip."
      />
      <div className="toolbar">
        <SearchField
          label="Search trips"
          placeholder="Search pickup, drop, driver or vehicle"
          value={query}
          onChange={setQuery}
        />
        <Chips options={FILTERS} value={filter} onChange={setFilter} label="Trip history" />
      </div>
      <p className="result-count">{list.length} trips · {formatKm(distance)}</p>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Trip</th>
              <th>Date</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Distance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((trip) => (
              <tr key={trip.id} tabIndex={0} onClick={() => setSelectedId(trip.id)} onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedId(trip.id);
                }
              }}>
                <td className="reg">{trip.id}</td>
                <td>{formatDate(trip.date)}</td>
                <td>{vehicleReg(trip.vehicleId)}</td>
                <td>{driverName(trip.driverId)}</td>
                <td className="col-place">{trip.pickup}</td>
                <td className="col-place">{trip.drop}</td>
                <td>{formatKm(trip.km)}</td>
                <td><StatusPill value={trip.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="empty">
            <h2>No trips match</h2>
            <p>Try Whitefield, Koramangala or a registration number.</p>
          </div>
        )}
      </div>
      {selected && (
        <Drawer title="Trip details" onClose={() => setSelectedId(null)}>
          <p className="detail-kicker">{selected.id}</p>
          <h3 className="detail-title">{formatKm(selected.km)}</h3>
          <StatusPill value={selected.status} />
          <dl className="meta">
            <dt>Date</dt>
            <dd>{formatDate(selected.date)}</dd>
            <dt>Time</dt>
            <dd>{formatWindow(selected.start, selected.end)}</dd>
            <dt>Duration</dt>
            <dd>{duration(selected.start, selected.end)}</dd>
            <dt>Pickup</dt>
            <dd>{selected.pickup}</dd>
            <dt>Drop</dt>
            <dd>{selected.drop}</dd>
            <dt>Vehicle</dt>
            <dd>
              <button type="button" className="linkish" onClick={() => onNavigate("vehicles", { vehicleId: selected.vehicleId })}>
                {vehicleReg(selected.vehicleId)}
              </button>
            </dd>
            <dt>Driver</dt>
            <dd>
              <button type="button" className="linkish" onClick={() => onNavigate("drivers", { driverId: selected.driverId })}>
                {driverName(selected.driverId)}
              </button>
            </dd>
          </dl>
          <button type="button" className="btn" onClick={() => onNavigate("tracking", { vehicleId: selected.vehicleId })}>
            Show vehicle on map
          </button>
        </Drawer>
      )}
    </>
  );
}
