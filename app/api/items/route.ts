import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Item from "@/lib/models/Item";
import { getCurrentUser } from "@/lib/auth";

// GET /api/items?search=&category=&sort=&page=&limit=
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const query: any = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (category) query.category = category;

    let sortOption: any = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err: any) {
    console.error("GET /api/items error:", err.message);
    return NextResponse.json(
      { message: "Failed to fetch items. Check your MONGODB_URI in .env.local", items: [], total: 0, pages: 1 },
      { status: 500 }
    );
  }
}

// POST /api/items  (protected)
export async function POST(req: NextRequest) {
  try {
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const required = ["title", "shortDescription", "fullDescription", "price", "category", "location"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 });
      }
    }

    const item = await Item.create({
      ...body,
      imageUrl: body.imageUrl || "https://placehold.co/600x400",
      ownerEmail: user.email
    });

    return NextResponse.json({ message: "Item created", item }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/items error:", err.message);
    return NextResponse.json({ message: "Server error while creating item" }, { status: 500 });
  }
}