export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Portfolio Overview
          </h1>
          <p className="text-zinc-500 mt-2">
            Welcome back to your AssetCore command center.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder for future cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-zinc-900/50 border border-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
