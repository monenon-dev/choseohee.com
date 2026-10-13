import { profile } from "@/data/profile";

export default function Contact() {
  const { github, email } = profile.links;

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2 className="text-3xl font-bold">Contact</h2>
        <ul className="mt-6 space-y-3">
          <li>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              GitHub ↗
            </a>
          </li>
          {email && (
            <li>
              <a
                href={`mailto:${email}`}
                className="text-text underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {email}
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
