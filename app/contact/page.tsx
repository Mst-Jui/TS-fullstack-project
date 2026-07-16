"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-4 text-2xl font-bold">Contact Us</h1>
      <p className="mb-6 text-gray-600">Have a question? Send us a message and we&apos;ll get back to you soon.</p>

      {sent ? (
        <p className="rounded-lg bg-green-100 p-4 text-green-700">Thanks! Your message has been sent.</p>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input required placeholder="Your name" className="w-full rounded-lg border px-4 py-2" />
          <input type="email" required placeholder="Your email" className="w-full rounded-lg border px-4 py-2" />
          <textarea required placeholder="Your message" rows={4} className="w-full rounded-lg border px-4 py-2" />
          <button className="w-full rounded-lg bg-primary py-3 font-semibold text-white">Send Message</button>
        </form>
      )}
    </div>
  );
}
