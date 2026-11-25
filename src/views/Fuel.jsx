import { useMemo, useState } from "react";
import { FUEL_WEEKS, MONTH_FUEL_TOTAL, TODAY, driverName, fuelRecords, vehicleReg } from "../data.js";
import { formatDate, formatInr, formatOdo, formatQty, formatRate } from "../format.js";
import { Chips, PageHeader } from "../ui.jsx";

const PERIODS = ["Daily", "Weekly", "Monthly"];

function inPeriod(record, period) {
  if (period === "Daily") return record.date === TODAY;
  if (period === "Weekly") return record.date >= "2026-11-23" && record.date <= TODAY;
  return true;
}

export function Fuel({ onNavigate }) {
  const [period, setPeriod] = useState("Daily");
  const rows = useMemo(
    () => fuelRecords.filter((record) => inPeriod(record, period)).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
    [period],
  );
  const spend = rows.reduce((sum, record) => sum + record.amount, 0);
  const diesel = rows.filter((record) => record.unit === "L").reduce((sum, record) => sum + record.qty, 0);
  const cng = rows.filter((record) => record.unit === "kg").reduce((sum, record) => sum + record.qty, 0);

  return (
    <>
      <PageHeader
        eyebrow="Cost"
        title="Fuel management"
        lede="Fill-up records for the sample fleet, with daily, weekly and monthly expense totals in rupees."
      >
        <Chips options={PERIODS} value={period} onChange={setPeriod} label="Expense period" />
      </PageHeader>

      <section className="stat-row">
        <article className="card">
          <div className="kpi-label">{period === "Monthly" ? "November expenses" : `${period} expenses`}</div>
          <strong>{formatInr(period === "Monthly" ? MONTH_FUEL_TOTAL : spend)}</strong>
          <p className="kpi-hint">{period === "Monthly" ? "Full fleet, 1–25 Nov" : "Itemised fill-ups below"}</p>
        </article>
        <article className="card">
          <div className="kpi-label">Fill-ups</div>
          <strong>{period === "Monthly" ? FUEL_WEEKS.reduce((sum, week) => sum + week.fills, 0) : rows.length}</strong>
          <p className="kpi-hint">{period === "Monthly" ? "Including weekly summaries" : "Shown in the table"}</p>
        </article>
        <article className="card">
          <div className="kpi-label">Diesel</div>
          <strong>{`${diesel.toLocaleString("en-IN")} L`}</strong>
          <p className="kpi-hint">{period === "Monthly" ? "Itemised 19–25 Nov" : "In this period"}</p>
        </article>
        <article className="card">
          <div className="kpi-label">CNG</div>
          <strong>{`${cng.toLocaleString("en-IN")} kg`}</strong>
          <p className="kpi-hint">{period === "Monthly" ? "Itemised 19–25 Nov" : "In this period"}</p>
        </article>
      </section>

      {period === "Monthly" && (
        <article className="card" style={{ padding: 0, marginBottom: 16 }}>
          <div className="card-head" style={{ padding: "16px 16px 0" }}>
            <h2>Monthly expenses</h2>
            <span>{formatInr(MONTH_FUEL_TOTAL)}</span>
          </div>
          <div className="table-wrap" style={{ border: 0 }}>
            <table className="data">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Fill-ups</th>
                  <th className="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                {FUEL_WEEKS.map((week) => (
                  <tr key={week.label}>
                    <td>{week.label}</td>
                    <td>{week.fills}</td>
                    <td className="num">{formatInr(week.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      )}

      <article className="card" style={{ padding: 0 }}>
        <div className="card-head" style={{ padding: "16px 16px 0" }}>
          <h2>{period === "Monthly" ? "Recent fill-ups" : "Fuel records"}</h2>
          <span>{period === "Monthly" ? `Itemised ${formatInr(spend)} from 19 Nov` : formatInr(spend)}</span>
        </div>
        <div className="table-wrap" style={{ border: 0 }}>
          <table className="data">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Station</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Odometer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((record) => (
                <tr key={record.id} onClick={() => onNavigate("vehicles", { vehicleId: record.vehicleId })}>
                  <td>{formatDate(record.date)}</td>
                  <td className="reg">{vehicleReg(record.vehicleId)}</td>
                  <td>{driverName(record.driverId)}</td>
                  <td className="col-place">{record.station}</td>
                  <td>{formatQty(record)}</td>
                  <td>{formatRate(record.rate)}</td>
                  <td>{formatInr(record.amount)}</td>
                  <td>{formatOdo(record.odometer)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      {period === "Monthly" && (
        <p className="note" style={{ marginTop: 10 }}>
          Week totals cover the full Bengaluru fleet. Line items from 19 November are the sample slips behind the latest totals.
        </p>
      )}
    </>
  );
}
