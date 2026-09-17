import { Fragment } from "react";
import { useScrollFill } from "../lib/useScrollFill";

type BrandMarkedHeadingProps = {
  as?: "h1" | "h2";
  text: string;
  word: string;
  id?: string;
  className?: string;
};

function withBreaks(text: string) {
  const lines = text.split("\n");
  if (lines.length === 1) return text;

  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

function splitHighlight(
  text: string,
  word: string,
): [string, string, string] | null {
  if (!word) return null;

  const index = text.toLocaleLowerCase().indexOf(word.toLocaleLowerCase());
  if (index === -1) return null;

  const afterIndex = index + word.length;
  const isWordChar = (char: string | undefined) =>
    Boolean(char && /\p{L}|\p{N}/u.test(char));

  if (index > 0 && isWordChar(text[index - 1])) return null;
  if (isWordChar(text[afterIndex])) return null;

  return [
    text.slice(0, index),
    text.slice(index, afterIndex),
    text.slice(afterIndex),
  ];
}

export function BrandMarkedHeading({
  as: Tag = "h2",
  text,
  word,
  id,
  className,
}: BrandMarkedHeadingProps) {
  const ref = useScrollFill<HTMLHeadingElement>();
  const parts = splitHighlight(text, word);

  return (
    <Tag id={id} ref={ref} className={className}>
      {parts ? (
        <>
          {withBreaks(parts[0])}
          <span className="psl-brand-mark">{parts[1]}</span>
          {withBreaks(parts[2])}
        </>
      ) : (
        withBreaks(text)
      )}
    </Tag>
  );
}
