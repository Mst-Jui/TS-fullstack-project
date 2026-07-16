import Link from "next/link";

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
          <div className="flex gap-3 text-sm text-gray-400">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TSProject. All rights reserved.
      </div>
    </footer>
  );
}
