import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[0.95rem] no-underline transition-colors ${
    isActive ? "font-medium text-text" : "text-muted hover:text-text"
  }`;

export function Header() {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <NavLink to="/" className="text-xl font-bold text-text no-underline">
        Pluma
      </NavLink>
      <nav aria-label="Main" className="flex gap-6">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
