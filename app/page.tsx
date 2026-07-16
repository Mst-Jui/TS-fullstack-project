
import Hero from "@/components/Hero";
import ItemCard from "@/components/ItemCard";
import NewsletterForm from "@/components/NewsletterForm";
import { connectDB } from "@/lib/db";
import Item from "@/lib/models/Item";

async function getFeaturedItems() {
  try {
    await connectDB();
    const items = await Item.find().sort({ createdAt: -1 }).limit(4);
    return JSON.parse(JSON.stringify(items));
  } catch {
    return [];
  }
}

const categories = ["Electronics", "Home", "Fashion", "Books"];

const testimonials = [
  { name: "Rafi Ahmed", text: "Super smooth experience, found exactly what I needed in minutes." },
  { name: "Nusrat Jahan", text: "Listing my product took less than 5 minutes. Loved the UI." },
  { name: "Tanvir Hasan", text: "Clean design and fast search — highly recommended." }
];

const faqs = [
  { q: "Is registration free?", a: "Yes, creating an account is completely free." },
  { q: "Can I edit my listing later?", a: "You can manage and delete your listings from the Manage Items page." },
  { q: "Is my data secure?", a: "We use JWT-based authentication and hashed passwords to keep your account safe." }
];

export default async function HomePage() {
  const items = await getFeaturedItems();

  return (
    <div>
      <Hero />

      {/* Section 1: Featured Items */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">Featured Listings</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((it: any) => (
              <ItemCard
                key={it._id}
                id={it._id}
                title={it.title}
                shortDescription={it.shortDescription}
                price={it.price}
                rating={it.rating}
                location={it.location}
                imageUrl={it.imageUrl}
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">
              No items yet — connect MongoDB and run <code>npm run seed</code> to see sample data.
            </p>
          )}
        </div>
      </section>

      {/* Section 2: Categories */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold">Popular Categories</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <div key={c} className="rounded-2xl border p-6 text-center font-medium hover:border-primary hover:text-primary">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Secure Auth", desc: "JWT-based login keeps your account protected." },
            { title: "Fast Search", desc: "Find what you need with instant filtering and sorting." },
            { title: "Clean UI", desc: "A consistent, responsive design across every device." }
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border p-6">
              <h3 className="mb-2 font-semibold text-primary">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Stats */}
      <section className="bg-neutral py-16 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {[
            { n: "5K+", l: "Active Users" },
            { n: "1.2K", l: "Listings" },
            { n: "98%", l: "Satisfaction" },
            { n: "24/7", l: "Support" }
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl font-bold text-secondary">{s.n}</p>
              <p className="text-sm text-gray-300">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold">What Our Users Say</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border p-6">
              <p className="text-sm italic text-gray-600">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border p-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Newsletter / CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary p-10 text-white md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="mt-1 text-gray-100">Join thousands of users buying and selling today.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}