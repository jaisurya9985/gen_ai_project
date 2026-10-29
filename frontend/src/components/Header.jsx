
import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Your personal fitness overview
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-400 hover:text-white">
          <Search size={20} />
        </button>

        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
          U
        </div>
      </div>
    </header>
  );
}
