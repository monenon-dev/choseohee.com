import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { navItems } from "@/components/navItems";
import { profile } from "@/data/profile";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-bold tracking-tight">
          {profile.siteName}
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex gap-8 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
