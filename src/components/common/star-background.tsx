export default function StarBackground() {
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-deep-space pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, #fff 50%, transparent 50%), radial-gradient(1.5px 1.5px at 50% 40%, #fff 50%, transparent 50%), radial-gradient(1px 1px at 80% 70%, #fff 50%, transparent 50%), radial-gradient(1px 1px at 30% 90%, #fff 50%, transparent 50%), radial-gradient(2px 2px at 70% 10%, #fff 50%, transparent 50%), radial-gradient(1px 1px at 90% 50%, #fff 50%, transparent 50%)",
          backgroundSize: "500px 500px",
        }}
      />
    </div>
  );
}
