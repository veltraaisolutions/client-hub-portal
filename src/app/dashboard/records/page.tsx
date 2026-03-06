import { MOCK_RECORDS } from "@/data/mock-records";

export default function RecordsPage() {
  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white italic">
          Investment Records
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          A complete history of your asset acquisitions and status.
        </p>
      </header>

      <div className="rounded-2xl border border-white/5 bg-zinc-900/20 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-zinc-400 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="px-6 py-4">Asset Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_RECORDS.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {record.assetName}
                </td>
                <td className="px-6 py-4 text-zinc-500">{record.type}</td>
                <td className="px-6 py-4 font-mono text-zinc-300">
                  ${record.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      record.status === "Active"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-zinc-500 font-mono">
                  {record.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
