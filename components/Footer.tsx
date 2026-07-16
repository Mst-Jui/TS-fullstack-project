import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.9c-.74.33-1.53.55-2.36.65a4.1 4.1 0 0 0 1.8-2.27c-.8.47-1.68.81-2.62 1a4.13 4.13 0 0 0-7.04 3.77A11.72 11.72 0 0 1 3.15 4.9a4.13 4.13 0 0 0 1.28 5.51c-.67-.02-1.3-.2-1.86-.51v.05a4.13 4.13 0 0 0 3.31 4.05c-.6.16-1.24.19-1.85.07a4.14 4.14 0 0 0 3.86 2.87A8.29 8.29 0 0 1 2 18.58a11.7 11.7 0 0 0 6.34 1.86c7.6 0 11.76-6.3 11.76-11.76 0-.18 0-.36-.01-.53.81-.58 1.5-1.31 2.05-2.15-.74.33-1.54.55-2.14.66z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: FacebookIcon },
  { name: "Twitter", href: "#", icon: LinkedInIcon }, // লিঙ্কডইন আইকন ঠিক করে নেবেন
  { name: "LinkedIn", href: "#", icon: LinkedInIcon }
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-neutral text-gray-200">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">TSProject</h3>
          <p className="text-sm text-gray-400">
            A production-ready full-stack marketplace built with Next.js, TypeScript and MongoDB.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/items">Explore</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@tsproject.com</li>
            <li>Phone: +880 1XXX-XXXXXX</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-primary hover:text-white"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TSProject. All rights reserved.
      </div>
    </footer>
  );
}