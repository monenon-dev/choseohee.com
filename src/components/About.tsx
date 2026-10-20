import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 왼쪽 정렬선은 컨테이너에 맞추고, 글 줄 길이는 3xl로 제한 */}
        <div className="reveal max-w-3xl">
          <h2 className="w-fit text-3xl font-bold text-gradient">About</h2>
          <div className="mt-6 space-y-3 leading-relaxed text-soft">
            {profile.about.map((sentence) => (
              <p key={sentence}>{sentence}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
