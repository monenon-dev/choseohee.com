import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ShortCard from "@/components/ShortCard";
import ShortsFeed from "@/components/ShortsFeed";
import { projects } from "@/data/projects";

// 서버 컴포넌트. ShortCard를 여기서 렌더링해 children으로 넘기므로
// ShortCard 코드는 클라이언트 번들에 포함되지 않습니다.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <section id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title" className="sr-only">
            Projects
          </h2>
          <ShortsFeed count={projects.length}>
            {projects.map((project, index) => (
              <ShortCard key={project.id} project={project} index={index} />
            ))}
          </ShortsFeed>
        </section>
        <Contact />
      </main>
    </>
  );
}
