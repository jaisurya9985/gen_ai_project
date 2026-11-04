
import { useState } from "react";
import {
  Sparkles,
  Clock,
  CalendarDays,
  Dumbbell,
  LoaderCircle,
  CheckCircle2,
  Target,
  Activity,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { generatePlan } from "../services/api";
import { useSearchParams } from "react-router-dom";

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

  const FieldLabel = ({ icon: Icon, children }) => (
    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
      {Icon && <Icon size={16} className="text-lime-400" />}
      {children}
    </label>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Page Header */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-lime-400">
          <Sparkles size={19} />
          <span className="text-xs font-bold tracking-widest">
            AI PERSONAL FITNESS COACH
          </span>
        </div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Create Your Fitness Plan
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          Tell us about your goals and lifestyle. Your AI coach will
          generate a personalized 7-day yoga and fitness plan.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-7 rounded-2xl border border-white/10 bg-[#151519] p-4 sm:p-7 md:p-8"
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="rounded-xl bg-lime-400/10 p-3">
            <Target className="text-lime-400" size={22} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Your Fitness Profile</h2>
            <p className="text-xs text-gray-500">
              Customize your training preferences
            </p>
          </div>
        </div>

        {/* Goal */}
        <div>
          <FieldLabel icon={Flame}>Fitness Goal</FieldLabel>
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

        {/* Profile fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel icon={Activity}>Experience Level</FieldLabel>
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
            <FieldLabel icon={Dumbbell}>Available Equipment</FieldLabel>
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
            <FieldLabel icon={CalendarDays}>Workout Days Per Week</FieldLabel>
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
            <FieldLabel icon={Clock}>Session Duration</FieldLabel>
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

        {/* Preferences */}
        <div>
          <FieldLabel icon={Sparkles}>
            Additional Preferences
          </FieldLabel>
          <textarea
            name="preferences"
            value={form.preferences}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Mention your preferences, limitations, or anything your AI coach should consider..."
            className="form-select resize-none"
          />
          <p className="mt-2 text-right text-xs text-gray-500">
            {form.preferences.length}/500
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Generate */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-400 py-4 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin" size={20} />
              Generating Your Plan...
            </>
          ) : (
            <>
              <Sparkles size={19} />
              Generate My 7-Day Plan
              <Dumbbell size={18} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          <ShieldCheck size={13} className="mr-1 inline text-lime-400" />
          AI-generated guidance. Review your plan before starting.
        </p>
      </form>

      {/* Generated Plan */}
      {result && (
        <section className="space-y-6">

          <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 sm:p-7">
            <div className="flex items-center gap-2 text-lime-400">
              <CheckCircle2 size={20} />
              <span className="text-xs font-bold tracking-widest">
                YOUR AI-GENERATED PLAN
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-white">
              {result.goal}
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs capitalize text-gray-300">
                {result.experience} level
              </span>
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-300">
                7-day plan
              </span>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="flex items-center gap-2">
            <CalendarDays className="text-lime-400" size={20} />
            <h3 className="text-lg font-bold text-white">
              Your Weekly Schedule
            </h3>
          </div>

          {result.days?.map((day) => (
            <div
              key={day.day}
              className="rounded-2xl border border-white/10 bg-[#151519] p-4 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold tracking-widest text-lime-400">
                    DAY {day.day}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                    {day.focus}
                  </h3>
                </div>

                <span className="shrink-0 rounded-lg bg-lime-400/10 px-3 py-2 text-xs font-medium text-lime-400">
                  {day.duration_minutes} min
                </span>
              </div>

              {day.activities?.length > 0 ? (
                <>
                  {day.warm_up?.length > 0 && (
                    <div className="mb-5 rounded-xl bg-white/[0.03] p-4">
                      <p className="mb-3 text-sm font-semibold text-lime-400">
                        Warm-up
                      </p>
                      {day.warm_up.map((item, index) => (
                        <p
                          key={index}
                          className="mb-2 text-sm text-gray-400 last:mb-0"
                        >
                          • {item}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <div
                        key={`${activity.name}-${index}`}
                        className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-xs font-bold text-lime-400">
                            {index + 1}
                          </span>

                          <div className="min-w-0">
                            <p className="font-medium text-white">
                              {activity.name}
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
                              {activity.sets != null &&
                                `${activity.sets} sets`}
                              {activity.reps_or_duration &&
                                ` · ${activity.reps_or_duration}`}
                              {activity.rest_seconds != null &&
                                ` · ${activity.rest_seconds}s rest`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {day.cool_down?.length > 0 && (
                    <div className="mt-5 rounded-xl bg-white/[0.03] p-4">
                      <p className="mb-3 text-sm font-semibold text-lime-400">
                        Cool-down
                      </p>
                      {day.cool_down.map((item, index) => (
                        <p
                          key={index}
                          className="mb-2 text-sm text-gray-400 last:mb-0"
                        >
                          • {item}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-xl bg-white/[0.03] p-5 text-center">
                  <Activity
                    size={24}
                    className="mx-auto mb-2 text-lime-400"
                  />
                  <p className="font-medium text-white">Recovery Day</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Allow your body to rest and recover.
                  </p>
                </div>
              )}

              {day.notes && (
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-gray-400">
                  {day.notes}
                </p>
              )}
            </div>
          ))}

          {/* Safety Notes */}
          {result.safety_notes?.length > 0 && (
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="text-yellow-400" size={20} />
                <h3 className="font-semibold text-yellow-400">
                  Safety Notes
                </h3>
              </div>

              {result.safety_notes.map((note, index) => (
                <p
                  key={index}
                  className="mb-2 text-sm leading-relaxed text-gray-300 last:mb-0"
                >
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
