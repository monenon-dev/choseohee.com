import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-dvh flex-col justify-center px-6 pt-(--header-h)"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-accent">{profile.position}</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <div className="mt-6 space-y-1 text-lg leading-relaxed text-muted">
          {profile.heroIntro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Projects 보기
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-text/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-text/50"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
