import { profile } from "@/data/profile";

export default function About() {
  const stackGroups = profile.stackGroups.filter(
    (group) => group.items.length > 0,
  );

  return (
    <section id="about" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 왼쪽 정렬선은 컨테이너에 맞추고, 글 줄 길이는 3xl로 제한 */}
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold">About</h2>
          <div className="mt-6 space-y-3 leading-relaxed text-soft">
            {profile.about.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>

          <dl className="mt-12 space-y-6">
            {stackGroups.map((group) => (
              <div key={group.name}>
                <dt className="text-sm font-semibold text-muted">
                  {group.name}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md bg-surface px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
