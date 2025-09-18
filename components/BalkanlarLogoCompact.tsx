interface BalkanlarLogoCompactProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function BalkanlarLogoCompact({ className = "", width = 48, height = 48 }: BalkanlarLogoCompactProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dağ silüetleri - scaled down from original */}
      <g transform="translate(24, 12) scale(0.12)">
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

      {/* Compact Text */}
      <g>
        {/* B */}
        <text
          x="16"
          y="38"
          fontSize="10"
          fontWeight="bold"
          fontFamily="Arial, Helvetica, sans-serif"
          fill="#1B5E20"
          textAnchor="middle"
        >
          B
        </text>

        {/* Z */}
        <text
          x="32"
          y="38"
          fontSize="10"
          fontWeight="bold"
          fontFamily="Arial, Helvetica, sans-serif"
          fill="#2E7D32"
          textAnchor="middle"
        >
          Z
        </text>
      </g>
    </svg>
  );
}