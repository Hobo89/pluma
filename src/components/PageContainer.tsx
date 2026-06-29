import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  wide?: boolean;
};

export function PageContainer({ children, wide = false }: PageContainerProps) {
  return (
    <div
      className={`mx-auto px-6 py-10 md:py-14 ${wide ? "max-w-5xl" : "max-w-3xl"}`}
    >
      {children}
    </div>
  );
}
