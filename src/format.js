const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function rupee(value, digits) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .format(value)
    .replace(/\s/g, "");
}

export function formatInr(value) {
  return rupee(value, 0);
}

export function formatRate(value) {
  return rupee(value, 2);
}

export function formatInrShort(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) {
    const compact = value / 1000;
    return `₹${compact.toFixed(compact >= 10 ? 1 : 2)}k`;
  }
  return formatInr(value);
}

export function formatDate(iso) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  return `${String(day).padStart(2, "0")} ${MONTHS_SHORT[month - 1]} ${year}`;
}

export function formatDateLong(iso) {
  if (!iso) return "—";
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatKm(value) {
  return `${value.toLocaleString("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} km`;
}

export function formatOdo(value) {
  return `${value.toLocaleString("en-IN")} km`;
}

export function formatQty(record) {
  return `${record.qty} ${record.unit}`;
}

export function duration(start, end) {
  if (!start || !end) return "—";
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const mins = endHour * 60 + endMinute - (startHour * 60 + startMinute);
  if (mins < 0) return "—";
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  if (hours === 0) return `${minutes} min`;
  return `${hours} h ${String(minutes).padStart(2, "0")} min`;
}

export function formatWindow(start, end) {
  if (!end) return `${start} · in progress`;
  return `${start}–${end}`;
}

export function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function shortReg(reg) {
  return reg.split(" ").slice(2).join(" ");
}

export function normReg(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
