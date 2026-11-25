import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FUEL_WEEKS, MONTH_FUEL_TOTAL, REPORTS, activeVehicles, buildReport, driverName, vehicles, vehicleReg } from "../data.js";
import { formatDate, formatInr, formatKm, formatQty } from "../format.js";
import { Icon } from "../icons.jsx";
import { PageHeader } from "../ui.jsx";

const ORDER = ["daily", "weekly", "monthly"];

export function Reports() {
  const [period, setPeriod] = useState("daily");
  const [preview, setPreview] = useState(false);
  const report = buildReport(period);

  function openPreview(next) {
    setPeriod(next);
    setPreview(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Records"
        title="Reports"
        lede="Daily, weekly and monthly summaries for the Bengaluru hub. Export opens a print-ready page you can save as PDF."
      />
      <div className="report-layout">
        {ORDER.map((id) => {
          const item = buildReport(id);
          return (
            <article key={id} className={period === id ? "report-card is-on" : "report-card"}>
              <button type="button" className="report-select" onClick={() => setPeriod(id)}>
                <h2>{REPORTS[id].label} report</h2>
                <p>{item.range}</p>
                <strong>{formatInr(item.fuelTotal)}</strong>
                <span className="muted">{item.tripRows.length} trips · {formatKm(item.distance)}</span>
              </button>
              <button type="button" className="btn" onClick={() => openPreview(id)}>
                <Icon name="download" />
                Export PDF
              </button>
            </article>
          );
        })}
      </div>

      <ReportBody report={report} />

      <div className="page-actions" style={{ marginTop: 16 }}>
        <button type="button" className="btn" onClick={() => setPreview(true)}>
          <Icon name="download" />
          Export {report.label.toLowerCase()} PDF
        </button>
      </div>

      {preview && <PdfPreview report={buildReport(period)} onClose={() => setPreview(false)} />}
    </>
  );
}

function ReportBody({ report }) {
  return (
    <div className="stack" style={{ marginTop: 16 }}>
      <section className="stat-row">
        <article className="card">
          <div className="kpi-label">Fuel</div>
          <strong>{formatInr(report.fuelTotal)}</strong>
        </article>
        <article className="card">
          <div className="kpi-label">Trips in this report</div>
          <strong>{report.tripRows.length}</strong>
        </article>
        <article className="card">
          <div className="kpi-label">Distance</div>
          <strong>{formatKm(report.distance)}</strong>
        </article>
        <article className="card">
          <div className="kpi-label">Active vehicles</div>
          <strong>{activeVehicles.length} / {vehicles.length}</strong>
        </article>
      </section>
      {report.id === "monthly" && (
        <article className="card" style={{ padding: 0 }}>
          <div className="card-head" style={{ padding: "16px 16px 0" }}>
            <h2>Fuel by week</h2>
            <span>{formatInr(MONTH_FUEL_TOTAL)}</span>
          </div>
          <div className="table-wrap" style={{ border: 0 }}>
            <table className="data">
              <thead>
                <tr><th>Period</th><th>Fill-ups</th><th>Amount</th></tr>
              </thead>
              <tbody>
                {FUEL_WEEKS.map((week) => (
                  <tr key={week.label}>
                    <td>{week.label}</td>
                    <td>{week.fills}</td>
                    <td>{formatInr(week.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}
      <article className="card" style={{ padding: 0 }}>
        <div className="card-head" style={{ padding: "16px 16px 0" }}>
          <h2>Trips</h2>
          <span>{report.range}</span>
        </div>
        <TripTable trips={report.tripRows} />
      </article>
      <article className="card" style={{ padding: 0 }}>
        <div className="card-head" style={{ padding: "16px 16px 0" }}>
          <h2>Fuel records</h2>
          <span>{report.id === "monthly" ? `Itemised ${formatInr(report.itemisedFuel)}` : formatInr(report.fuelTotal)}</span>
        </div>
        <FuelTable rows={report.fuelRows} />
      </article>
    </div>
  );
}

function TripTable({ trips }) {
  if (trips.length === 0) return <div className="empty"><h2>No trips in this period</h2></div>;
  return (
    <div className="table-wrap" style={{ border: 0 }}>
      <table className="data">
        <thead>
          <tr>
            <th>Trip</th><th>Date</th><th>Vehicle</th><th>Driver</th><th>Pickup</th><th>Drop</th><th>Distance</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td className="reg">{trip.id}</td>
              <td>{formatDate(trip.date)}</td>
              <td>{vehicleReg(trip.vehicleId)}</td>
              <td>{driverName(trip.driverId)}</td>
              <td className="col-place">{trip.pickup}</td>
              <td className="col-place">{trip.drop}</td>
              <td>{formatKm(trip.km)}</td>
              <td>{trip.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FuelTable({ rows }) {
  if (rows.length === 0) return <div className="empty"><h2>No fill-ups in this period</h2></div>;
  return (
    <div className="table-wrap" style={{ border: 0 }}>
      <table className="data">
        <thead>
          <tr>
            <th>Date</th><th>Vehicle</th><th>Station</th><th>Quantity</th><th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{formatDate(row.date)}</td>
              <td className="reg">{vehicleReg(row.vehicleId)}</td>
              <td className="col-place">{row.station}</td>
              <td>{formatQty(row)}</td>
              <td>{formatInr(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PdfPreview({ report, onClose }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="pdf-modal" role="dialog" aria-modal="true" aria-label={`${report.title} preview`}>
      <div className="pdf-toolbar">
        <p>{report.ref} · preview</p>
        <div className="page-actions">
          <button type="button" className="btn" onClick={() => window.print()}>
            <Icon name="download" />
            Save as PDF
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
      <article className="pdf-sheet">
        <header className="pdf-brand">
          <div>
            <p>LINEHAUL · BENGALURU HUB</p>
            <h2>{report.title}</h2>
            <p>{report.range}</p>
          </div>
          <div>
            <p>Reference {report.ref}</p>
            <p>Prepared 25 Nov 2026</p>
            <p>Ananya Sharma, Fleet admin</p>
          </div>
        </header>
        <section className="pdf-kpis">
          <div><span>Fuel</span><strong>{formatInr(report.fuelTotal)}</strong></div>
          <div><span>Trips</span><strong>{report.tripRows.length}</strong></div>
          <div><span>Distance</span><strong>{formatKm(report.distance)}</strong></div>
          <div><span>Active vehicles</span><strong>{activeVehicles.length} / {vehicles.length}</strong></div>
        </section>
        {report.id === "monthly" && (
          <>
            <h3>Fuel by week</h3>
            <table>
              <thead><tr><th>Period</th><th>Fill-ups</th><th>Amount</th></tr></thead>
              <tbody>
                {FUEL_WEEKS.map((week) => (
                  <tr key={week.label}>
                    <td>{week.label}</td>
                    <td>{week.fills}</td>
                    <td>{formatInr(week.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pdf-note">Week totals are the full fleet. The fill-up lines below are the sample slips from 19 November.</p>
          </>
        )}
        <h3>Trips</h3>
        <table>
          <thead>
            <tr><th>Trip</th><th>When</th><th>Vehicle</th><th>Driver</th><th>Pickup</th><th>Drop</th><th>Km</th></tr>
          </thead>
          <tbody>
            {report.tripRows.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{formatDate(trip.date)} {trip.start}</td>
                <td>{vehicleReg(trip.vehicleId)}</td>
                <td>{driverName(trip.driverId)}</td>
                <td>{trip.pickup}</td>
                <td>{trip.drop}</td>
                <td>{trip.km.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Fuel</h3>
        <table>
          <thead>
            <tr><th>Date</th><th>Vehicle</th><th>Driver</th><th>Station</th><th>Qty</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {report.fuelRows.map((row) => (
              <tr key={row.id}>
                <td>{formatDate(row.date)}</td>
                <td>{vehicleReg(row.vehicleId)}</td>
                <td>{driverName(row.driverId)}</td>
                <td>{row.station}</td>
                <td>{formatQty(row)}</td>
                <td>{formatInr(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="pdf-foot">
          Demonstration report for Linehaul. Figures are sample data for Bengaluru and are not an accounts or statutory record.
          Use the browser print dialog and choose Save as PDF.
        </p>
      </article>
    </div>,
    document.body,
  );
}
