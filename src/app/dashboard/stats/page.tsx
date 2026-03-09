import { MOCK_STATS } from "@/data/mock-records";

export default function StatsPage() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background">
      {/* HEADER SECTION */}
      <header className="space-y-2 border-b border-border pb-8">
        <h1 className="text-4xl font-medium tracking-tight text-foreground italic">
          Financial{" "}
          <span className="not-italic font-bold text-primary">Analytics</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Detailed performance breakdown for AssetCore Global Infrastructure
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* DETAILED DATA CARD  */}
        <div className="p-10 rounded-none bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between mb-10 border-b border-border pb-4">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">
              Portfolio Metrics
            </h2>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1">
              Live Data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="space-y-8">
              <MetricRow
                label="Total Portfolio Value"
                value={`$${MOCK_STATS.totalPortfolio.toLocaleString()}`}
                valueClass="text-foreground"
              />
              <MetricRow
                label="Annualized Yield"
                value="8.4%"
                valueClass="text-emerald-600" // Professional green for white bg
              />
            </div>
            <div className="space-y-8">
              <MetricRow
                label="Monthly Dividends"
                value={`$${MOCK_STATS.monthlyDividends}`}
                valueClass="text-primary"
              />
              <MetricRow
                label="Active Asset Units"
                value={MOCK_STATS.activeAssets}
                valueClass="text-foreground"
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
  valueClass = "text-foreground",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-end border-b border-border pb-3 transition-colors hover:border-primary/30 group">
      <span className="text-muted-foreground text-sm font-bold uppercase tracking-wider group-hover:text-foreground transition-colors">
        {label}
      </span>
      <span className={`text-2xl font-bold tracking-tighter ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
