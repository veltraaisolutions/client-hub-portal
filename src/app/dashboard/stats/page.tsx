import { MOCK_STATS } from "@/data/mock-records";

export default function StatsPage() {
  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-white italic">
          Financial Analytics
        </h1>
        <p className="text-zinc-500 text-sm font-medium tracking-wide">
          Detailed performance breakdown for AssetCore
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Detailed Data Card */}
        <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 shadow-2xl">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
            Portfolio Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <MetricRow
                label="Total Portfolio Value"
                value={`$${MOCK_STATS.totalPortfolio.toLocaleString()}`}
              />
              <MetricRow
                label="Annualized Yield"
                value="8.4%"
                valueClass="text-green-400"
              />
            </div>
            <div className="space-y-6">
              <MetricRow
                label="Monthly Dividends"
                value={`$${MOCK_STATS.monthlyDividends}`}
                valueClass="text-blue-400"
              />
              <MetricRow
                label="Active Asset Units"
                value={MOCK_STATS.activeAssets}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-end border-b border-white/5 pb-2">
      <span className="text-zinc-500 text-sm font-medium">{label}</span>
      <span className={`text-xl font-mono font-bold ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
