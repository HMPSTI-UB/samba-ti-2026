export default function MabaAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-deep-space text-soft-white font-poppins">
      {children}
    </div>
  );
}
