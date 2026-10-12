import MobileNav from "@/components/MobileNav";
import { navItems } from "@/components/navItems";
import { profile } from "@/data/profile";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <a href="#home" className="font-bold">
          {profile.name}
        </a>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex gap-8 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
