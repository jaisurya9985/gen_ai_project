
import { useState } from "react";
import { Dumbbell, Search } from "lucide-react";
import exercises from "../exercises.json";

export default function ExerciseLibrary() {
  const [search, setSearch] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-lime-400">
        <Dumbbell size={22} />
        <span className="text-sm font-semibold">FITNESS LIBRARY</span>
      </div>

      <h1 className="text-3xl font-bold text-white">
        Exercise Library
      </h1>

      <p className="mt-2 text-gray-400">
        Explore exercises, yoga poses, and fitness activities.
      </p>

      <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-[#151519] px-4 py-3">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          All Exercises
        </h2>
        <span className="text-sm text-lime-400">
          {filteredExercises.length} exercises
        </span>
      </div>

      {filteredExercises.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No exercises found.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredExercises.map((exercise, index) => (
            <div
              key={`${exercise.name}-${index}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#151519] transition hover:-translate-y-1 hover:border-lime-400/40"
            >
              <div className="h-48 overflow-hidden bg-[#202027]">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold capitalize text-white">
                  {exercise.name}
                </h3>
                <p className="mt-2 text-xs text-lime-400">
                  {exercise.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
