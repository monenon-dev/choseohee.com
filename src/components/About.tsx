import { profile } from "@/data/profile";

export default function About() {
  const stackGroups = profile.stackGroups.filter(
    (group) => group.items.length > 0,
  );

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-3xl font-bold">About</h2>
        <div className="mt-6 space-y-3 leading-relaxed text-text/85">
          {profile.about.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>

        <dl className="mt-12 space-y-6">
          {stackGroups.map((group) => (
            <div key={group.name}>
              <dt className="text-sm font-semibold text-muted">{group.name}</dt>
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
    </section>
  );
}
