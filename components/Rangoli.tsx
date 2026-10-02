/** Kolam / rangoli line art used by the title showers and the About Me intro. */
export default function Rangoli({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const dots = Array.from({ length: 24 }, (_, i) => i * 15);
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      <circle r="96" className="ts-m-ring" />
      <circle r="88" className="ts-m-ring ts-m-dash" />
      {dots.map((a) => (
        <circle key={a} r="1.3" cx="0" cy="-92" transform={`rotate(${a})`} className="ts-m-bindu" />
      ))}
      {petals.map((a) => (
        <path key={a} d="M0 -84 C10 -66 10 -52 0 -40 C-10 -52 -10 -66 0 -84Z" transform={`rotate(${a})`} className="ts-m-petal" />
      ))}
      {petals.map((a) => (
        <path key={`s${a}`} d="M0 -38 C5 -30 5 -25 0 -21 C-5 -25 -5 -30 0 -38Z" transform={`rotate(${a + 15})`} className="ts-m-petal" />
      ))}
      <circle r="38" className="ts-m-ring" />
      <polygon points="0,-34 29.4,17 -29.4,17" className="ts-m-tri" />
      <polygon points="0,34 -29.4,-17 29.4,-17" className="ts-m-tri" />
      <circle r="6" className="ts-m-bindu" />
    </svg>
  );
}
