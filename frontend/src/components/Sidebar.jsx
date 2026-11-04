
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Brain,
  Activity,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "AI Plan Generator", path: "/plan-generator", icon: Brain },
  { name: "Exercise Library", path: "/exercise-library", icon: Dumbbell },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#17171b] text-white shadow-lg md:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#111114] p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-lime-400 p-2 text-black">
              <Activity size={23} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                FlexFlow AI
              </h1>
              <p className="text-xs text-gray-500">
                Yoga & Fitness
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-lime-400 font-semibold text-black"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom settings */}
        <div className="mt-auto">
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings size={19} />
            Settings
          </button>

          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs text-gray-600">
              FlexFlow AI
            </p>
            <p className="mt-1 text-[11px] text-gray-700">
              Your personal fitness companion
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
