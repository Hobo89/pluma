import { bonoStripCards } from "../config/bonos";

function StripGroup() {
  return (
    <div className="psl-bono-strip__group">
      {bonoStripCards.map((card) => (
        <img
          key={card.id}
          src={card.png}
          alt=""
          width={card.width}
          height={card.height}
          decoding="async"
          draggable={false}
          className="psl-bono-strip__card"
        />
      ))}
    </div>
  );
}

export function BonoCardStrip() {
  return (
    <div className="psl-bono-strip" aria-hidden="true">
      <div className="psl-bono-strip__track">
        <StripGroup />
        <StripGroup />
      </div>
    </div>
  );
}
