import { MOCK_RECORDS } from "@/data/mock-records";

export default function RecordsPage() {
  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto bg-background min-h-screen">
      {/* HEADER SECTION */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-5 w-1 bg-primary" /> {/* Branding Accent */}
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">
            Institutional Ledger
          </p>
        </div>
        <h1 className="text-4xl font-medium tracking-tight text-foreground italic">
          Investment <span className="not-italic font-bold">Records</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-3 font-medium max-w-2xl">
          A complete historical audit of your asset acquisitions, compliance
          status, and deployment timeline within the AssetCore ecosystem.
        </p>
      </header>

      {/* TABLE SECTION */}
      <div className="rounded-none border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-secondary/50 text-foreground uppercase text-[10px] tracking-[0.2em] font-bold border-b border-border">
            <tr>
              <th className="px-6 py-5">Asset Name</th>
              <th className="px-6 py-5">Asset Class</th>
              <th className="px-6 py-5">Capital Amount</th>
              <th className="px-6 py-5">Verification Status</th>
              <th className="px-6 py-5 text-right">Date of Entry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_RECORDS.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-primary/[0.03] transition-colors group"
              >
                <td className="px-6 py-5 font-bold text-foreground group-hover:text-primary transition-colors">
                  {record.assetName}
                </td>
                <td className="px-6 py-5 text-muted-foreground font-medium uppercase text-[11px] tracking-wide">
                  {record.type}
                </td>
                <td className="px-6 py-5 font-bold text-foreground tabular-nums">
                  ${record.amount.toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest border ${
                      record.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right text-muted-foreground font-medium tabular-nums">
                  {record.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="pt-4 space-y-4">
        <p className="text-[10px] text-muted-foreground leading-relaxed max-w-4xl italic uppercase tracking-wider">
          * All recorded figures are adjusted for current market volatility and
          represent gross acquisition value. Please contact your AssetCore
          representative for certified institutional statements and tax
          documentation.
        </p>
      </div>
    </div>
  );
}
