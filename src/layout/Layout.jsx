import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slidebar from "../components/Slidebar";

export default function Layout() {
  const [menu, setMenu] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div
        className={`${menu ? "w-64" : "w-20"} relative border-r border-slate-200 bg-white transition-[width] duration-300 ease-out will-change-[width]`}
      >
        <Slidebar collapsed={!menu} />

        <button
          type="button"
          onClick={() => setMenu((prev) => !prev)}
          className="absolute -right-3 top-6 grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:text-slate-900"
          aria-label={menu ? "Collapse sidebar" : "Expand sidebar"}
        >
          {menu ? <FiChevronLeft className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
        </button>
      </div>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
