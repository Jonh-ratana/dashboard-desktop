const monthlySales = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 56 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 68 },
  { month: "May", value: 61 },
  { month: "Jun", value: 75 },
]

const trafficSources = [
  { label: "Direct", percent: 38, color: "bg-slate-900" },
  { label: "Search", percent: 27, color: "bg-slate-700" },
  { label: "Social", percent: 21, color: "bg-slate-500" },
  { label: "Referral", percent: 14, color: "bg-slate-300" },
]

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">Static preview data for update testing</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">1,248</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">$42,630</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Conversion</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">4.7%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Active Users</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">8,912</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 xl:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Monthly Sales</h2>
          <div className="flex h-56 items-end gap-3">
            {monthlySales.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-md bg-slate-900/10">
                  <div
                    className="w-full rounded-md bg-slate-900 transition-all"
                    style={{ height: `${item.value * 2}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Traffic Sources</h2>
          <div className="space-y-3">
            {trafficSources.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-700">{item.label}</span>
                  <span className="font-medium text-slate-900">{item.percent}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2.5 rounded-full ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
