import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type PointerEvent,
} from "react";
import { useLanguage } from "../context/LanguageContext";
import { BrandMarkedHeading } from "./BrandMarkedHeading";
import {
  MassageIllustrationDeepTissue,
  MassageIllustrationPregnancy,
  MassageIllustrationRelaxing,
  MassageIllustrationSports,
} from "./illustrations/MassageIllustrations";

const typeIds = [
  "pregnancy",
  "relaxingLymphatic",
  "deepTissue",
  "sports",
] as const;

type TechniqueId = (typeof typeIds)[number];

/** One traced line illustration per massage type. */
const typeIllustrations: Record<
  TechniqueId,
  ComponentType<{ className?: string }>
> = {
  pregnancy: MassageIllustrationPregnancy,
  relaxingLymphatic: MassageIllustrationRelaxing,
  deepTissue: MassageIllustrationDeepTissue,
  sports: MassageIllustrationSports,
};

const HOVER_PREVIEW_MS = 120;
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function canHoverPreview() {
  return window.matchMedia(HOVER_QUERY).matches;
}

export function MassageTypes() {
  const { t } = useLanguage();
  const [persistentOpenId, setPersistentOpenId] = useState<TechniqueId | null>(
    null,
  );
  const [hoverPreviewId, setHoverPreviewId] = useState<TechniqueId | null>(
    null,
  );
  const hoverTimer = useRef<number>(0);
  const suppressHoverId = useRef<TechniqueId | null>(null);

  useEffect(
    () => () => {
      window.clearTimeout(hoverTimer.current);
    },
    [],
  );

  function clearHoverTimer() {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = 0;
  }

  function togglePersistent(id: TechniqueId) {
    clearHoverTimer();
    setHoverPreviewId(null);
    setPersistentOpenId((current) => {
      if (current === id) {
        suppressHoverId.current = id;
        return null;
      }

      suppressHoverId.current = null;
      return id;
    });
  }

  function onPointerEnter(id: TechniqueId, event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    if (!canHoverPreview()) return;
    if (suppressHoverId.current === id) return;

    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => {
      setHoverPreviewId(id);
    }, HOVER_PREVIEW_MS);
  }

  function onPointerLeave(id: TechniqueId) {
    clearHoverTimer();
    if (suppressHoverId.current === id) suppressHoverId.current = null;
    setHoverPreviewId((current) => (current === id ? null : current));
  }

  return (
    <section
      className="psl-container psl-section psl-types"
      aria-labelledby="massage-types-heading"
    >
      <div className="psl-section-head psl-section-head--stack">
        <BrandMarkedHeading
          id="massage-types-heading"
          className="psl-title"
          text={t("types.title")}
          word={t("types.titleHighlight")}
        />
        {t("types.description")
          .split("\n\n")
          .map((paragraph) => (
            <p key={paragraph} className="psl-copy">
              {paragraph}
            </p>
          ))}
      </div>

      <div className="psl-product-grid psl-product-grid--types">
        {typeIds.map((id) => {
          const Illustration = typeIllustrations[id];
          const title = t(`types.${id}`);
          const copy = t(`types.copy.${id}`);
          const copyId = `technique-${id}-copy`;
          const flipped = persistentOpenId === id || hoverPreviewId === id;

          return (
            <button
              key={id}
              type="button"
              className={`psl-product psl-product--flip${flipped ? " is-flipped" : ""}`}
              aria-expanded={flipped}
              aria-label={title}
              aria-describedby={flipped ? copyId : undefined}
              onClick={() => togglePersistent(id)}
              onPointerEnter={(event) => onPointerEnter(id, event)}
              onPointerLeave={() => onPointerLeave(id)}
            >
              <span className="psl-product__flip">
                <span
                  className="psl-product__face psl-product__face--front psl-product__image psl-product__image--illustration psl-product__image--drawing"
                  aria-hidden="true"
                >
                  <Illustration />
                </span>
                <span
                  className="psl-product__face psl-product__face--back"
                  aria-hidden={!flipped}
                >
                  <span className="psl-product__back-title">{title}</span>
                  <span id={copyId} className="psl-product__copy">
                    {copy}
                  </span>
                </span>
              </span>
              <span className="psl-product__meta">
                <span className="psl-product__name">{title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
