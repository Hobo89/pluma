const navLinks = [
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <a href="/" className="text-xl font-bold text-text no-underline">
        Pluma
      </a>
      <nav aria-label="Main" className="flex gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[0.95rem] text-muted no-underline transition-colors hover:text-text"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
