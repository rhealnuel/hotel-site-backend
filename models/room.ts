import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface
export interface IRoom extends Document {
  name: string;
  type: "guest" | "suite" | "executive";
  description?: string;
  price: number;
  available: boolean;
  image: string;
  highlight?: string[];
  comfort?: string[];
  convenience?: string[];
  confidence?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema definition
const roomSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["guest", "suite", "executive"],
      required: true,
      default: "guest",
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
    highlight: {
      type: [String],
    },
    comfort: {
      type: [String],
    },
    convenience: {
      type: [String],
    },
    confidence: {
      type: [String],
    },
  },
  {
    timestamps: true, // ✅ enables createdAt and updatedAt
  }
);

// Model export
const Room = mongoose.model<IRoom>("Room", roomSchema);
export default Room;
