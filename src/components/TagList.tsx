/** 작은 태그 칩 목록. 상세 페이지 스택 칩과 같은 스타일입니다. */
export default function TagList({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md bg-text/10 px-2 py-0.5 text-xs text-text/90"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
