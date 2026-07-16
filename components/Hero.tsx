"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  { title: "Find Anything You Need", subtitle: "Browse thousands of listings from trusted sellers." },
  { title: "Sell With Confidence", subtitle: "List your items in minutes with our simple tools." },
  { title: "Secure & Fast", subtitle: "JWT authentication keeps your account safe." }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex h-[65vh] min-h-[420px] flex-col items-center justify-center bg-gradient-to-br from-primary to-neutral px-4 text-center text-white">
      <p className="mb-2 text-sm uppercase tracking-widest text-secondary">Welcome</p>
      <h1 className="max-w-2xl text-3xl font-extrabold md:text-5xl">{slides[index].title}</h1>
      <p className="mt-4 max-w-xl text-gray-200">{slides[index].subtitle}</p>
      <div className="mt-8 flex gap-4">
        <Link href="/items" className="rounded-lg bg-secondary px-6 py-3 font-semibold text-neutral hover:opacity-90">
          Explore Now
        </Link>
        <Link href="/register" className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-neutral">
          Get Started
        </Link>
      </div>
      <div className="mt-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-secondary" : "bg-white/40"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
