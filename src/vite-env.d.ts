/// <reference types="vite/client" />

interface PlumaHeroBoot {
  status: "pending" | "released" | "skipped";
  release: () => void;
}

interface Window {
  __plumaHeroBoot?: PlumaHeroBoot;
}

interface Navigator {
  connection?: { saveData?: boolean };
}
