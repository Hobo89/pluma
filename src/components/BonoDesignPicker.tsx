import { bonoDesigns, type BonoDesignId } from "../config/bonos";
import { useLanguage } from "../context/LanguageContext";
import { BonoCard } from "./BonoCard";

type BonoDesignPickerProps = {
  value: BonoDesignId;
  onChange: (id: BonoDesignId) => void;
};

/**
 * A native radio group, so arrow keys move between designs and the selected
 * option is announced. Selection is shown by a tick and an outline as well as
 * by colour, and all three designs are visible at once rather than behind a
 * carousel.
 */
export function BonoDesignPicker({ value, onChange }: BonoDesignPickerProps) {
  const { t } = useLanguage();

  return (
    <fieldset className="psl-bono-designs">
      <legend className="psl-bono-designs__legend">
        {t("bonos.designTitle")}
      </legend>
      <p className="psl-copy psl-copy--small">{t("bonos.designDescription")}</p>

      <div className="psl-bono-designs__options">
        {bonoDesigns.map((design) => {
          const selected = design.id === value;
          const inputId = `bono-design-${design.id}`;

          return (
            <div
              key={design.id}
              className={`psl-bono-design${selected ? " psl-bono-design--selected" : ""}`}
            >
              <input
                type="radio"
                id={inputId}
                name="bono-design"
                value={design.id}
                checked={selected}
                onChange={() => onChange(design.id)}
                className="psl-bono-design__input"
              />
              <label htmlFor={inputId} className="psl-bono-design__label">
                <BonoCard
                  design={design}
                  alt=""
                  sizes="(max-width: 767px) 40vw, 180px"
                  className="psl-bono-design__art"
                />
                <span className="psl-bono-design__name">
                  <span className="psl-bono-design__tick" aria-hidden="true">
                    {selected ? (
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                    ) : null}
                  </span>
                  {design.name}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
