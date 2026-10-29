
import {
  Flame,
  Dumbbell,
  Clock,
  Target,
  ArrowUpRight,
  Play,
} from "lucide-react";
import StatCard from "../components/StatCard";

const activities = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 30 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-white">
          Welcome back! 👋
        </h1>
        <p className="mt-2 text-gray-400">
          Here's your fitness progress at a glance.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Calories Burned" value="1,240" unit="kcal" change="+12% this week" icon={Flame} />
        <StatCard title="Workouts" value="12" unit="sessions" change="3 this week" icon={Dumbbell} />
        <StatCard title="Active Time" value="8.5" unit="hours" change="+2.5 hrs this week" icon={Clock} />
        <StatCard title="Goals Completed" value="8" unit="of 10" change="80% completion" icon={Target} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#151519] p-6 xl:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
              <p className="text-sm text-gray-500">Your activity this week</p>
            </div>
            <span className="rounded-lg bg-lime-400/10 px-3 py-2 text-sm text-lime-400">
              This Week
            </span>
          </div>

          <div className="flex h-52 items-end justify-between gap-3">
            {activities.map((item) => (
              <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-lime-400 transition hover:bg-lime-300"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#151519] p-6">
          <h2 className="text-lg font-semibold text-white">Today's Goal</h2>
          <p className="mt-1 text-sm text-gray-500">Keep pushing forward</p>

          <div className="my-8 flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-lime-400/20">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">75%</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            You're doing great! Keep it up.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#20251a] to-[#151519] p-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-lime-400">AI FITNESS ASSISTANT</p>
            <h2 className="text-2xl font-bold text-white">Ready for your next workout?</h2>
            <p className="mt-2 text-sm text-gray-400">
              Generate a personalized yoga and fitness plan with AI.
            </p>
          </div>

          <button
            onClick={() => window.location.href = "/plan-generator"}
            className="flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black transition hover:bg-lime-300"
          >
            <Play size={18} />
            Generate Plan
            <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
