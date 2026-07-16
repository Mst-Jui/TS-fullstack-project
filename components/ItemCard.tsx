import Link from "next/link";
import Image from "next/image";

export interface ItemCardProps {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  location: string;
  imageUrl: string;
}

export default function ItemCard({ id, title, shortDescription, price, rating, location, imageUrl }: ItemCardProps) {
  return (
    <div className="flex h-[380px] w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-1 font-semibold text-neutral">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{shortDescription}</p>
        </div>
        <div>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <span className="font-bold text-primary">৳{price}</span>
            <span>⭐ {rating}</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">{location}</p>
          <Link
            href={`/items/${id}`}
            className="mt-3 block rounded-lg bg-primary py-2 text-center text-sm text-white hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
