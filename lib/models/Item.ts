import { Schema, models, model } from "mongoose";

export interface IItem {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: string;
  location: string;
  rating: number;
  imageUrl: string;
  ownerEmail: string;
  createdAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    imageUrl: { type: String, required: true },
    ownerEmail: { type: String, required: true }
  },
  { timestamps: true }
);

export default models.Item || model<IItem>("Item", ItemSchema);
