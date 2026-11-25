export function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "dashboard" && (
        <>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </>
      )}
      {name === "truck" && (
        <>
          <path d="M3 7h11v8H3z" />
          <path d="M14 10h4l3 3v2h-7" />
          <circle cx="7" cy="17.5" r="1.5" />
          <circle cx="18" cy="17.5" r="1.5" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19c.6-2.6 2.7-4 5.5-4s4.9 1.4 5.5 4" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M16 15c1.8.3 3.2 1.4 3.8 4" />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === "route" && (
        <>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6h5a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H10" />
        </>
      )}
      {name === "fuel" && (
        <>
          <path d="M5 20V5h9v15" />
          <path d="M5 10h9" />
          <path d="M14 7h2a2 2 0 0 1 2 2v6a1.6 1.6 0 0 0 3.2 0V9.5L18 7" />
          <path d="M4 20h12" />
        </>
      )}
      {name === "file" && (
        <>
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </>
      )}
      {name === "menu" && (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
      {name === "close" && (
        <>
          <path d="M6 6l12 12M18 6L6 18" />
        </>
      )}
      {name === "download" && (
        <>
          <path d="M12 4v11" />
          <path d="M7 11l5 5 5-5" />
          <path d="M5 20h14" />
        </>
      )}
    </svg>
  );
}

export function BrandMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M5 16c2.2-.4 3.4-4.2 6.2-5.2C14 9.6 15.2 11 19 8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="5" cy="16" r="1.7" fill="#fff" />
      <circle cx="19" cy="8" r="1.7" fill="#fff" />
    </svg>
  );
}
