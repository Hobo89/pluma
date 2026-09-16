export function CopyBlocks({
  text,
  className = "psl-copy",
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
