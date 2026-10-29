
import { Dumbbell } from "lucide-react";

export default function ExerciseLibrary() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-lime-400">
        <Dumbbell size={22} />
        <span className="text-sm font-semibold">FITNESS LIBRARY</span>
      </div>

      <h1 className="text-3xl font-bold text-white">Exercise Library</h1>

      <p className="mt-2 text-gray-400">
        Explore exercises, yoga poses, and fitness activities.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#151519] p-10 text-center">
        <Dumbbell size={40} className="mx-auto text-lime-400" />
        <h2 className="mt-4 text-xl font-semibold text-white">
          Your Exercise Library
        </h2>
        <p className="mt-2 text-gray-500">
          Exercise and yoga search will be available here.
        </p>
      </div>
    </div>
  );
}
