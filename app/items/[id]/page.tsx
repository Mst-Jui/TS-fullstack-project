import { connectDB } from "@/lib/db";
import Item from "@/lib/models/Item";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getItem(id: string) {
  try {
    await connectDB();
    const item = await Item.findById(id);
    if (!item) return null;
    return JSON.parse(JSON.stringify(item));
  } catch {
    return null;
  }
}

export default async function ItemDetailsPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="mt-2 text-gray-600">{item.shortDescription}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span className="font-bold text-primary">৳{item.price}</span>
            <span>⭐ {item.rating}</span>
            <span>{item.location}</span>
          </div>

          <div className="mt-6 rounded-xl border p-4">
            <h2 className="mb-2 font-semibold">Description / Overview</h2>
            <p className="text-sm text-gray-600">{item.fullDescription}</p>
          </div>

          <div className="mt-4 rounded-xl border p-4">
            <h2 className="mb-2 font-semibold">Key Information</h2>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Category: {item.category}</li>
              <li>Location: {item.location}</li>
              <li>Listed by: {item.ownerEmail}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl border p-4">
        <h2 className="mb-2 font-semibold">Reviews & Ratings</h2>
        <p className="text-sm text-gray-500">No reviews yet. Be the first to purchase and share your feedback.</p>
      </div>
    </div>
  );
}
