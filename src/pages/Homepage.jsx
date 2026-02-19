const weeklyPerformance = [
  { day: "Mon", score: 62 },
  { day: "Tue", score: 74 },
  { day: "Wed", score: 55 },
  { day: "Thu", score: 81 },
  { day: "Fri", score: 69 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 77 },
]

const tasks = [
  { title: "Sync distributor report", status: "Done", color: "bg-emerald-500" },
  { title: "Review payment alerts", status: "In Progress", color: "bg-amber-500" },
  { title: "Update branch pricing list", status: "Pending", color: "bg-slate-400" },
]

export default function Homepage() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Home Overview</h1>
        <p className="mt-2 text-sm text-slate-200">Version 0.0.6 visual update test</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-300">Today Orders</p>
            <p className="mt-1 text-xl font-semibold">326</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-300">Pending Items</p>
            <p className="mt-1 text-xl font-semibold">41</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-300">Team Online</p>
            <p className="mt-1 text-xl font-semibold">18</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Weekly Performance</h2>
            <span className="text-xs text-slate-500">Static demo chart</span>
          </div>
          <div className="flex h-56 items-end gap-2">
            {weeklyPerformance.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded bg-slate-100">
                  <div
                    className="w-full rounded bg-slate-900"
                    style={{ height: `${item.score * 1.8}px` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Task Queue</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.title} className="rounded-lg border border-slate-100 p-3">
                <p className="text-sm font-medium text-slate-800">{task.title}</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className={`h-2 w-2 rounded-full ${task.color}`} />
                  <span className="text-slate-600">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
