import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Item from "@/lib/models/Item";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const item = await Item.findById(params.id);
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const item = await Item.findById(params.id);
  if (!item) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (item.ownerEmail !== user.email && user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await item.deleteOne();
  return NextResponse.json({ message: "Item deleted" });
}
