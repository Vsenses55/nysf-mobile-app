// Map pin markers, drawn to match the pins in the Figma map: coloured teardrops
// with a number, and navy teardrops with a white amenity icon.

const ICONS = {
  parking: <text x="20" y="25.5" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" fontFamily="Inter, system-ui, sans-serif">P</text>,
  food: (
    <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
      <path d="M15 11v7a3 3 0 0 0 6 0v-7M18 11v18" />
      <path d="M25.5 29V11c-2.5 1.5-3.5 4.5-3.5 8h3.5" fill="#fff" />
    </g>
  ),
  aid: (
    <g>
      <rect x="11" y="13" width="18" height="14" rx="3" fill="#fff" />
      <path d="M20 16.5v7M16.5 20h7" stroke="#1f3667" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  access: (
    <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20.5" cy="11.5" r="1.8" fill="#fff" stroke="none" />
      <path d="M19.5 15v6h5.5l2.5 5" />
      <path d="M17 18.5a6 6 0 1 0 8 7.5" />
    </g>
  ),
  cool: (
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <path d="M20 11v18M12.2 15.5l15.6 9M12.2 24.5l15.6-9" />
      <path d="M17.5 12.5L20 15l2.5-2.5M17.5 27.5L20 25l2.5 2.5" fill="none" />
    </g>
  ),
  show: (
    <g fill="#fff">
      <path d="M20 10l9 7H11z" />
      <path d="M12.5 18h15v10h-15z" opacity=".9" />
      <path d="M18 28v-6h4v6z" fill="#1f3667" />
    </g>
  ),
  info: <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="Georgia, serif" fontStyle="italic">i</text>,
};

export default function MapPin({ pin }) {
  const navy = pin.kind === 'amenity';
  const fill = navy ? '#1f3667' : pin.color;
  return (
    <svg className="map-pin-svg" width="40" height="52" viewBox="0 0 40 52" aria-hidden="true">
      <path
        d="M20 51C20 51 4 33.5 4 20a16 16 0 0 1 32 0c0 13.5-16 31-16 31z"
        fill={fill}
        stroke="#fff"
        strokeWidth="3"
      />
      {navy ? (
        ICONS[pin.icon] || ICONS.info
      ) : (
        <text
          x="20"
          y="25.5"
          textAnchor="middle"
          fontSize={pin.label.length > 1 ? 15 : 17}
          fontWeight="800"
          fill="#fff"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {pin.label}
        </text>
      )}
    </svg>
  );
}
