/// <reference types="vite/client" />

interface PlumaHeroBoot {
  status: "pending" | "released";
  releaseReason?: string;
  release: (reason?: string) => void;
}

interface Window {
  __plumaHeroBoot?: PlumaHeroBoot;
}

interface Navigator {
  connection?: { saveData?: boolean; addEventListener?: EventTarget["addEventListener"]; removeEventListener?: EventTarget["removeEventListener"] };
}

interface HTMLVideoElement {
  requestVideoFrameCallback?: (callback: (now: number, metadata: unknown) => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
}
