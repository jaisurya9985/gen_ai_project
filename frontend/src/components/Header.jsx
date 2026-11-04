
import { Bell, Search, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/": {
    title: "Dashboard",
    subtitle: "Your personal AI fitness space",
  },
  "/plan-generator": {
    title: "AI Plan Generator",
    subtitle: "Create a fitness plan tailored to your goals",
  },
  "/exercise-library": {
    title: "Exercise Library",
    subtitle: "Discover movements and training exercises",
  },
};

export default function Header() {
  const location = useLocation();

  const currentPage = pageInfo[location.pathname] || {
    title: "FlexFlow AI",
    subtitle: "Your personal fitness companion",
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-3 border-b border-white/10 bg-[#111114]/95 px-4 py-3 backdrop-blur-xl sm:px-6 md:px-8">

      {/* Page title */}
      <div className="min-w-0 pl-12 md:pl-0">
        <h2 className="truncate text-lg font-bold text-white sm:text-xl">
          {currentPage.title}
        </h2>

        <p className="mt-1 hidden truncate text-sm text-gray-500 sm:block">
          {currentPage.subtitle}
        </p>
      </div>

      {/* Header actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* AI indicator */}
        <div className="hidden items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-2 sm:flex">
          <Sparkles size={15} className="text-lime-400" />
          <span className="text-xs font-medium text-lime-400">
            AI Powered
          </span>
        </div>

        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white/5 hover:text-lime-400"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-white/5 hover:text-lime-400"
        >
          <Bell size={20} />
        </button>

        {/* Guest profile */}
        <div
          title="Guest user"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-400/30 bg-lime-400 font-bold text-black sm:h-10 sm:w-10"
        >
          G
        </div>
      </div>
    </header>
  );
}
