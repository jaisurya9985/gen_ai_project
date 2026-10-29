
import { useState } from "react";
import {
  Sparkles,
  Clock,
  CalendarDays,
  Dumbbell,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";
import { generatePlan } from "../services/api";

export default function PlanGenerator() {
  const [form, setForm] = useState({
    goal: "Build muscle",
    experience: "beginner",
    equipment: "bodyweight",
    days_per_week: 5,
    minutes_per_session: 45,
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      goal: form.goal,
      experience: form.experience,
      days_per_week: Number(form.days_per_week),
      minutes_per_session: Number(form.minutes_per_session),
      equipment: [form.equipment],
      preferences: form.preferences,
    };

    try {
      const data = await generatePlan(payload);
      setResult(data.plan);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Unable to generate your plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <div className="mb-3 flex items-center gap-2 text-lime-400">
          <Sparkles size={20} />
          <span className="text-sm font-semibold">AI POWERED</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          Create Your Fitness Plan
        </h1>

        <p className="mt-2 text-gray-400">
          Let AI build your personalized 7-day yoga and fitness plan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-[#151519] p-6 sm:p-8"
      >
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Fitness Goal
          </label>

          <input
            name="goal"
            value={form.goal}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={200}
            className="form-select"
            placeholder="e.g. Build muscle and improve flexibility"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Experience Level
            </label>

            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="form-select"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Available Equipment
            </label>

            <select
              name="equipment"
              value={form.equipment}
              onChange={handleChange}
              className="form-select"
            >
              <option value="bodyweight">No Equipment</option>
              <option value="dumbbells">Dumbbells</option>
              <option value="bands">Resistance Bands</option>
              <option value="kettlebell">Kettlebell</option>
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <CalendarDays size={16} />
              Workout Days Per Week
            </label>

            <select
              name="days_per_week"
              value={form.days_per_week}
              onChange={handleChange}
              className="form-select"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <option key={day} value={day}>
                  {day} days
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-gray-300">
              <Clock size={16} />
              Session Duration
            </label>

            <select
              name="minutes_per_session"
              value={form.minutes_per_session}
              onChange={handleChange}
              className="form-select"
            >
              {[10, 20, 30, 45, 60, 90, 120].map((time) => (
                <option key={time} value={time}>
                  {time} minutes
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Additional Preferences
          </label>

          <textarea
            name="preferences"
            value={form.preferences}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Any preferences or limitations? (Optional)"
            className="form-select resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              Generating Your Plan...
            </>
          ) : (
            <>
              <Dumbbell size={19} />
              Generate My 7-Day Plan
              <Sparkles size={18} />
            </>
          )}
        </button>

        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </form>

      {result && (
        <section className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-lime-400">
              <CheckCircle2 size={20} />
              <span className="text-sm font-semibold">
                YOUR AI-GENERATED PLAN
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {result.goal}
            </h2>

            <p className="mt-1 text-sm capitalize text-gray-400">
              {result.experience} level · 7-day plan
            </p>
          </div>

          {result.days?.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl border border-white/10 bg-[#151519] p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-lime-400">
                    DAY {day.day}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    {day.focus}
                  </h3>
                </div>

                <span className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300">
                  {day.duration_minutes} min
                </span>
              </div>

              {day.activities?.length > 0 ? (
                <>
                  {day.warm_up?.length > 0 && (
                    <div className="mb-5">
                      <p className="mb-2 text-sm font-semibold text-gray-300">
                        Warm-up
                      </p>
                      {day.warm_up.map((item, index) => (
                        <p key={index} className="text-sm text-gray-400">
                          • {item}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <div
                        key={`${activity.name}-${index}`}
                        className="rounded-xl bg-white/[0.03] p-4"
                      >
                        <p className="font-medium text-white">
                          {index + 1}. {activity.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {activity.sets != null &&
                            `${activity.sets} sets`}
                          {activity.reps_or_duration &&
                            ` · ${activity.reps_or_duration}`}
                          {activity.rest_seconds != null &&
                            ` · ${activity.rest_seconds}s rest`}
                        </p>
                      </div>
                    ))}
                  </div>

                  {day.cool_down?.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-sm font-semibold text-gray-300">
                        Cool-down
                      </p>
                      {day.cool_down.map((item, index) => (
                        <p key={index} className="text-sm text-gray-400">
                          • {item}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400">
                  Recovery day. Allow your body to rest and recover.
                </p>
              )}

              {day.notes && (
                <p className="mt-4 border-t border-white/10 pt-4 text-sm text-gray-400">
                  {day.notes}
                </p>
              )}
            </div>
          ))}

          {result.safety_notes?.length > 0 && (
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <h3 className="mb-3 font-semibold text-yellow-400">
                Safety Notes
              </h3>

              {result.safety_notes.map((note, index) => (
                <p key={index} className="mb-2 text-sm text-gray-300">
                  • {note}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
