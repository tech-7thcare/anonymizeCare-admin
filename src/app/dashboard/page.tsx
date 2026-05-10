export default function DashboardPage() {
  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          High-level view of clinical staff and system health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
            Total Consultants
          </h3>
          <p className="text-4xl font-bold text-[#007CD7]">42</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
            Active Tokens
          </h3>
          <p className="text-4xl font-bold text-slate-800">14,208</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
            Total Spend
          </h3>
          <p className="text-4xl font-bold text-slate-800">$245.8k</p>
        </div>
      </div>

      {/* Placeholder for more dashboard components */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl min-h-[400px] flex items-center justify-center text-slate-400 shadow-sm text-lg font-medium border-dashed">
        Dashboard content area (to be built)
      </div>
    </div>
  );
}
