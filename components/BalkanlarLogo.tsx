interface BalkanlarLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function BalkanlarLogo({ className = "", width = 200, height = 150 }: BalkanlarLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dağ silüetleri */}
      <g transform="translate(200, 100)">
        {/* Sol dağ */}
        <path
          d="M -120 40 L -80 -30 L -60 -10 L -40 20 L -20 40 Z"
          fill="#2E7D32"
          opacity="0.9"
        />

        {/* Orta dağ (en büyük) */}
        <path
          d="M -60 40 L -20 -40 L 0 -20 L 20 -45 L 60 40 Z"
          fill="#1B5E20"
        />

        {/* Sağ dağ */}
        <path
          d="M 20 40 L 60 -25 L 80 -5 L 100 15 L 120 40 Z"
          fill="#2E7D32"
          opacity="0.8"
        />

        {/* Kar detayları */}
        <path
          d="M -80 -30 L -70 -20 L -75 -15 L -85 -25 Z"
          fill="white"
          opacity="0.7"
        />
        <path
          d="M 20 -45 L 35 -30 L 30 -25 L 15 -35 Z"
          fill="white"
          opacity="0.7"
        />
        <path
          d="M 60 -25 L 70 -15 L 65 -10 L 55 -20 Z"
          fill="white"
          opacity="0.7"
        />
      </g>

      {/* Logo metni */}
      <text
        x="200"
        y="180"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="bold"
        fill="#1B5E20"
      >
        Balkanların
      </text>
      <text
        x="200"
        y="220"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="42"
        fontWeight="bold"
        fill="#2E7D32"
      >
        Zirveleri
      </text>

      {/* Alt çizgi dekorasyon */}
      <line
        x1="100"
        y1="240"
        x2="300"
        y2="240"
        stroke="#2E7D32"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}