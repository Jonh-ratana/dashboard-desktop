import { NavLink } from "react-router-dom";
import { FiBarChart2, FiGrid, FiHome } from "react-icons/fi";

const navItems = [
  { to: "/", label: "Dashboard", icon: FiBarChart2, end: true },
  { to: "/home", label: "Home", icon: FiHome },
  { to: "/table", label: "Table", icon: FiGrid },
];

export default function Slidebar({ collapsed = false }) {
  return (
    <aside className="h-full px-3 py-6">
      <div className="mb-6 border-b border-slate-200 px-2 pb-4">
        <h2 className="flex items-center justify-center overflow-hidden font-semibold text-slate-800">
          <span
            className={`whitespace-nowrap transition-all duration-300 ease-out ${
              collapsed ? "max-w-0 -translate-x-2 opacity-0" : "max-w-40 translate-x-0 opacity-100"
            }`}
          >
            My Desktop
          </span>
        </h2>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              } ${collapsed ? "justify-center px-2" : "justify-start px-3"}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                collapsed ? "max-w-0 -translate-x-2 opacity-0" : "max-w-24 translate-x-0 opacity-100"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
