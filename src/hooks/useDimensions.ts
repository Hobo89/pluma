import { useEffect, useState, type RefObject } from "react";

type Dimensions = {
  width: number;
  height: number;
};

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement | null>,
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [ref]);

  return dimensions;
}
