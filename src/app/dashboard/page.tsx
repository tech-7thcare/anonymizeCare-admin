export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-zinc-400 mt-1">
          High-level view of clinical staff and system health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#131b20] border border-[#1f2930] p-6 rounded-2xl flex flex-col gap-2">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Total Consultants
          </h3>
          <p className="text-4xl font-semibold text-[#98e9a8]">42</p>
        </div>
        <div className="bg-[#131b20] border border-[#1f2930] p-6 rounded-2xl flex flex-col gap-2">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Active Tokens
          </h3>
          <p className="text-4xl font-semibold text-white">14,208</p>
        </div>
        <div className="bg-[#131b20] border border-[#1f2930] p-6 rounded-2xl flex flex-col gap-2">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Total Spend
          </h3>
          <p className="text-4xl font-semibold text-white">$245.8k</p>
        </div>
      </div>

      {/* Placeholder for more dashboard components */}
      <div className="bg-[#131b20] border border-[#1f2930] p-8 rounded-2xl min-h-[400px] flex items-center justify-center text-zinc-500">
        Dashboard content area (to be built)
      </div>
    </div>
  );
}
