import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  wide?: boolean;
};

export function PageContainer({ children, wide = false }: PageContainerProps) {
  return (
    <div
      className={`psl-page ${wide ? "psl-container psl-container--wide" : "psl-container"}`}
    >
      {children}
    </div>
  );
}
