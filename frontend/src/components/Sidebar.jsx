
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Brain,
  Activity,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "AI Plan Generator", path: "/plan-generator", icon: Brain },
  { name: "Exercise Library", path: "/exercise-library", icon: Dumbbell },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-[#111114] p-6">
      <div className="mb-12 flex items-center gap-3">
        <div className="rounded-xl bg-lime-400 p-2 text-black">
          <Activity size={23} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">FlexFlow AI</h1>
          <p className="text-xs text-gray-500">Yoga & Fitness</p>
        </div>
      </div>

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

      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
          <Settings size={19} />
          Settings
        </button>
      </div>
    </aside>
  );
}
