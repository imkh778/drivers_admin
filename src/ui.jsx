import { useEffect } from "react";
import { Icon } from "./icons.jsx";
import { cx } from "./format.js";

export function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <header className="page-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {children && <div className="page-actions">{children}</div>}
    </header>
  );
}

export function StatusPill({ value }) {
  const key = value.toLowerCase().replace(/\s+/g, "-");
  return <span className={`pill pill-${key}`}>{value}</span>;
}

export function BarChart({ series, formatValue, label }) {
  const max = Math.max(...series.map((item) => item.value), 1);
  return (
    <div
      className="bars"
      role="img"
      aria-label={label || series.map((item) => `${item.label} ${item.value}`).join(", ")}
    >
      {series.map((item) => (
        <div className={cx("bar", item.today && "is-today")} key={item.label}>
          <div className="bar-value">{formatValue ? formatValue(item.value) : item.value}</div>
          <div className="bar-track">
            <div className="bar-fill" style={{ height: `${(item.value / max) * 100}%` }} />
          </div>
          <div className="bar-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Drawer({ title, onClose, children }) {
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

  return (
    <div className="drawer-root">
      <button type="button" className="drawer-backdrop" aria-label="Close details" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </aside>
    </div>
  );
}

export function SearchField({ label, value, onChange, placeholder }) {
  return (
    <label className="search">
      <Icon name="search" />
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </label>
  );
}

export function Chips({ options, value, onChange, label }) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={cx("chip", value === option && "is-on")}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
