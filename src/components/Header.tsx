import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/book", label: "Book" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    onHome
      ? `text-[0.95rem] no-underline transition-colors ${
          isActive
            ? "font-medium text-white"
            : "text-white/75 hover:text-white"
        }`
      : `text-[0.95rem] no-underline transition-colors ${
          isActive
            ? "font-medium text-text"
            : "text-muted hover:text-text"
        }`;

  const bookClass = ({ isActive }: { isActive: boolean }) =>
    onHome
      ? `rounded-lg px-3 py-1.5 text-[0.95rem] font-semibold no-underline transition-colors ${
          isActive
            ? "bg-white text-accent"
            : "bg-white/90 text-accent hover:bg-white"
        }`
      : `rounded-lg px-3 py-1.5 text-[0.95rem] font-semibold no-underline transition-colors ${
          isActive
            ? "bg-accent-hover text-white"
            : "bg-accent text-white hover:bg-accent-hover"
        }`;

  return (
    <header
      className={
        onHome
          ? "absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 to-transparent"
          : "border-b border-border"
      }
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <NavLink
          to="/"
          className={`text-xl font-bold no-underline ${
            onHome ? "text-white" : "text-text"
          }`}
        >
          Pluma
        </NavLink>
        <nav aria-label="Main" className="flex items-center gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={link.to === "/book" ? bookClass : linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle overlay={onHome} />
        </nav>
      </div>
    </header>
  );
}
