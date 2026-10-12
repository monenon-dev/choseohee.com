import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ProjectShelf from "@/components/ProjectShelf";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectShelf />
      <About />
      <Contact />
    </main>
  );
}
