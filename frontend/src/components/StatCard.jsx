
export default function StatCard({ title, value, unit, change, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#151519] p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-gray-400">{title}</p>
        <div className="rounded-xl bg-lime-400/10 p-2 text-lime-400">
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>

      <p className="mt-3 text-xs text-lime-400">{change}</p>
    </div>
  );
}
