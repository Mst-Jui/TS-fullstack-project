"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ItemType {
  _id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ManageItemsPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/items?limit=100");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Items</h1>
        <Link href="/items/add" className="rounded-lg bg-primary px-4 py-2 text-sm text-white">
          + Add Item
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No items yet. Add your first item.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id} className="border-t">
                  <td className="p-3 font-medium">{it.title}</td>
                  <td className="p-3">{it.category}</td>
                  <td className="p-3">৳{it.price}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link href={`/items/${it._id}`} className="rounded-lg border px-3 py-1 hover:bg-gray-50">
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(it._id)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-white hover:opacity-90"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
