// public/logo-biru-tua.svg — square 1125x1125 mark, full-bleed (no padding).
// Replaces the old logo.svg which needed a hardcoded crop.
export default function Logo({ height = 30, className }) {
  return (
    <img
      src="/logo-biru-tua.svg"
      alt="TechSaaSWeb logo"
      className={className}
      style={{ height, width: 'auto', flex: 'none', display: 'block' }}
    />
  );
}
