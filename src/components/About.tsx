export function About() {
  return (
    <section id="about" className="border-t border-border py-10">
      <h2 className="mb-3 text-2xl font-semibold">About</h2>
      <p className="max-w-2xl text-muted">
        Built with React, TypeScript, Tailwind CSS, and Vite. Deployed to{" "}
        <a
          href="https://pages.github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover"
        >
          GitHub Pages
        </a>{" "}
        at <strong className="font-medium text-text">pluma.life</strong>.
      </p>
    </section>
  );
}
