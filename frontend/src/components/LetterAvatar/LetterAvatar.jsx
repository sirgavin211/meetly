export default function LetterAvatar({
  name = "?",
  size = 48,
  bgColor = "#8b9972ff",
  textColor = "#3A3A3A",
}) {
  const letter = name[0]?.toUpperCase() || "?";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`Avatar for ${name}`}
    >
      {/* background */}
      <circle cx="50" cy="50" r="50" fill={bgColor} />

      {/* letter */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="48"
        fill={textColor}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
      >
        {letter}
      </text>
    </svg>
  );
}
