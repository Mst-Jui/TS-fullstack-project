"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) {
    return <p className="rounded-lg bg-white/20 px-4 py-2 text-sm">Thanks for subscribing! 🎉</p>;
  }

  return (
    <form
      className="flex w-full max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="w-full rounded-lg px-4 py-2 text-neutral"
      />
      <button className="rounded-lg bg-secondary px-5 py-2 font-semibold text-neutral">Subscribe</button>
    </form>
  );
}