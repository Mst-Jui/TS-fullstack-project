"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CurrentUser {
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Explore" },
    { href: "/about", label: "About" }
  ];

  const loggedInExtra = [
    { href: "/items/add", label: "Add Item" },
    { href: "/items/manage", label: "Manage Items" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-primary">
          TS<span className="text-secondary">Project</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {loggedOutLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-neutral hover:text-primary">
              {l.label}
            </Link>
          ))}
          {user &&
            loggedInExtra.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-neutral hover:text-primary">
                {l.label}
              </Link>
            ))}
          <Link href="/contact" className="text-sm font-medium text-neutral hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-neutral px-4 py-2 text-sm text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Login
              </Link>
              <Link href="/register" className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:opacity-90">
                Register
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          {[...loggedOutLinks, ...(user ? loggedInExtra : []), { href: "/contact", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="mt-2 w-full rounded-lg bg-neutral py-2 text-sm text-white">
              Logout
            </button>
          ) : (
            <div className="mt-2 flex gap-2">
              <Link href="/login" className="flex-1 rounded-lg border py-2 text-center text-sm">
                Login
              </Link>
              <Link href="/register" className="flex-1 rounded-lg bg-primary py-2 text-center text-sm text-white">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
