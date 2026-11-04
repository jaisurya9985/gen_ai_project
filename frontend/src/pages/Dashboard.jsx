
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Dumbbell,
  Flower2,
  HeartPulse,
  Play,
  Scale,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const goals = [
  {
    title: "Build Strength",
    description: "Build muscle and improve strength",
    icon: Dumbbell,
  },
  {
    title: "Improve Flexibility",
    description: "Improve mobility and movement",
    icon: Activity,
  },
  {
    title: "Weight Management",
    description: "Work towards a healthy weight",
    icon: Scale,
  },
  {
    title: "General Fitness",
    description: "Improve your overall fitness",
    icon: HeartPulse,
  },
];

const features = [
  {
    title: "Yoga Library",
    description: "Explore yoga poses, benefits and instructions.",
    icon: Flower2,
    path: "/exercise-library",
    tag: "YOGA",
  },
  {
    title: "Exercise Library",
    description: "Discover exercises for your fitness goals.",
    icon: Dumbbell,
    path: "/exercise-library",
    tag: "FITNESS",
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 pb-8 sm:space-y-10">

      {/* Welcome */}
      <section>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-lime-400">
            YOUR PERSONAL FITNESS SPACE
          </span>
          <Sparkles size={15} className="text-lime-400" />
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Move better.{" "}
          <span className="text-lime-400">Feel stronger.</span>
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          Discover smarter ways to train, improve flexibility and build
          a healthier lifestyle with your AI fitness coach.
        </p>
      </section>

      {/* AI Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-lime-400/20 bg-gradient-to-br from-[#252d19] via-[#191c17] to-[#151519] p-5 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-2">
              <Sparkles size={15} className="text-lime-400" />
              <span className="text-xs font-semibold tracking-wide text-lime-400">
                AI FITNESS COACH
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Your goals.
              <br />
              Your routine.
              <br />
              <span className="text-lime-400">Powered by AI.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
              Get a personalized 7-day yoga and fitness plan based on
              your experience, goals, schedule and available equipment.
            </p>

            <Link
              to="/plan-generator"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-300 sm:w-auto"
            >
              <Play size={18} />
              Generate My Plan
              <ArrowUpRight size={18} />
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-lime-400" />
                Personalized plans
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-lime-400" />
                Yoga and fitness
              </span>
            </div>
          </div>

          {/* Decorative AI visual */}
          <div className="relative hidden min-h-64 items-center justify-center lg:flex">
            <div className="absolute h-64 w-64 rounded-full border border-lime-400/10" />
            <div className="absolute h-48 w-48 rounded-full border border-lime-400/20" />
            <div className="absolute h-32 w-32 rounded-full bg-lime-400/10 blur-xl" />

            <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-lime-400/30 bg-lime-400/10 shadow-2xl shadow-lime-400/10">
              <Brain size={58} className="text-lime-400" />
            </div>

            <div className="absolute right-8 top-8 rounded-xl border border-white/10 bg-[#20231d] p-3 shadow-xl">
              <Activity className="text-lime-400" size={22} />
            </div>

            <div className="absolute bottom-8 left-8 rounded-xl border border-white/10 bg-[#20231d] p-3 shadow-xl">
              <Dumbbell className="text-lime-400" size={22} />
            </div>

            <div className="absolute bottom-5 right-7 rounded-xl border border-white/10 bg-[#20231d] p-3 shadow-xl">
              <Flower2 className="text-lime-400" size={22} />
            </div>
          </div>
        </div>
      </section>

      {/* Fitness goals */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            What would you like to improve?
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a goal to get started with your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {goals.map((goal) => {
            const Icon = goal.icon;

            return (
              <Link
                key={goal.title}
                to={`/plan-generator?goal=${encodeURIComponent(goal.title)}`}
                className="group rounded-2xl border border-white/10 bg-[#151519] p-5 transition hover:-translate-y-1 hover:border-lime-400/40 hover:bg-[#1c2019]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 transition group-hover:bg-lime-400/20">
                  <Icon size={22} className="text-lime-400" />
                </div>

                <h3 className="font-semibold text-white">
                  {goal.title}
                </h3>

                <p className="mt-2 text-sm leading-5 text-gray-500">
                  {goal.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs font-medium text-lime-400">
                    Explore goal
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-gray-500 transition group-hover:text-lime-400"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Libraries */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Explore your training
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Find exercises and movements that match your goals.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.path}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151519] p-5 transition hover:border-lime-400/30 hover:bg-[#1c2019] sm:gap-5 sm:p-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-400/10">
                  <Icon size={28} className="text-lime-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold tracking-widest text-lime-400">
                    {feature.tag}
                  </span>

                  <h3 className="mt-1 font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {feature.description}
                  </p>
                </div>

                <ArrowRight
                  size={20}
                  className="shrink-0 text-gray-500 transition group-hover:translate-x-1 group-hover:text-lime-400"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl border border-white/10 bg-[#151519] p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lime-400">
              <Zap size={17} />
              <span className="text-xs font-semibold tracking-wider">
                START TODAY
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold text-white">
              Small steps. Stronger habits.
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your next fitness journey starts with one plan.
            </p>
          </div>

          <Link
            to="/plan-generator"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-5 py-3 font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black"
          >
            Create a workout plan
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

    </div>
  );
}
