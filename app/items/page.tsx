"use client";

import { useEffect, useState, useCallback } from "react";
import ItemCard from "@/components/ItemCard";
import SkeletonCard from "@/components/SkeletonCard";

interface ItemType {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  location: string;
  imageUrl: string;
  category: string;
}

const categories = ["", "Electronics", "Home", "Fashion", "Books"];

export default function ExplorePage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, category, sort, page: String(page), limit: "8" });
    const res = await fetch(`/api/items?${params.toString()}`);
    const data = await res.json();
    setItems(data.items || []);
    setPages(data.pages || 1);
    setLoading(false);
  }, [search, category, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Explore Listings</h1>

      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by title..."
          className="flex-1 rounded-lg border px-4 py-2"
        />
        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="rounded-lg border px-4 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c || "All Categories"}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border px-4 py-2">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map((it) => (
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
            ))}
        {!loading && items.length === 0 && (
          <p className="col-span-full text-gray-500">No items found. Try a different search or filter.</p>
        )}
      </div>

      {pages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-lg border ${page === i + 1 ? "bg-primary text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
