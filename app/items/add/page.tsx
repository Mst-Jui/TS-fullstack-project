"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "Electronics",
    location: "",
    imageUrl: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      router.push("/items/manage");
    } catch {
      setError("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Add New Item</h1>

      {error && <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-lg border px-4 py-2"
        />
        <textarea
          name="shortDescription"
          required
          value={form.shortDescription}
          onChange={handleChange}
          placeholder="Short description"
          className="w-full rounded-lg border px-4 py-2"
          rows={2}
        />
        <textarea
          name="fullDescription"
          required
          value={form.fullDescription}
          onChange={handleChange}
          placeholder="Full description"
          className="w-full rounded-lg border px-4 py-2"
          rows={4}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            required
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="rounded-lg border px-4 py-2"
          />
          <select name="category" value={form.category} onChange={handleChange} className="rounded-lg border px-4 py-2">
            <option>Electronics</option>
            <option>Home</option>
            <option>Fashion</option>
            <option>Books</option>
          </select>
        </div>
        <input
          name="location"
          required
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full rounded-lg border px-4 py-2"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full rounded-lg border px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
