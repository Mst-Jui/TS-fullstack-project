// Run with: npm run seed
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User";
import Item from "./models/Item";

dotenv.config({ path: ".env.local" });

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to DB");

  await User.deleteMany({});
  await Item.deleteMany({});

  const userPass = await bcrypt.hash("user1234", 10);
  const adminPass = await bcrypt.hash("admin1234", 10);

  await User.create([
    { name: "Demo User", email: "user@demo.com", password: userPass, role: "user" },
    { name: "Demo Admin", email: "admin@demo.com", password: adminPass, role: "admin" }
  ]);

  const categories = ["Electronics", "Home", "Fashion", "Books"];
  const items = Array.from({ length: 20 }).map((_, i) => ({
    title: `Sample Product ${i + 1}`,
    shortDescription: "A short and useful description of this product.",
    fullDescription:
      "This is a detailed full description explaining features, specifications and everything a buyer needs to know before purchasing this product.",
    price: 500 + i * 37,
    category: categories[i % categories.length],
    location: "Dhaka, Bangladesh",
    rating: 3 + (i % 3),
    imageUrl: `https://placehold.co/600x400?text=Product+${i + 1}`,
    ownerEmail: "admin@demo.com"
  }));

  await Item.insertMany(items);
  console.log("Seed complete: 2 users, 20 items created");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
