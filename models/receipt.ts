import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface
export interface IReceipt extends Document {
  receiptNumber: string;
  customerName: string;
  roomId: mongoose.Types.ObjectId;
  roomType: string;
  price: number;
  paymentMethod: "cash" | "card" | "transfer";
  checkInDate: Date;
  checkOutDate: Date;
  issuedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema
const receiptSchema: Schema = new Schema(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "transfer"],
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Model export
const Receipt = mongoose.model<IReceipt>("Receipt", receiptSchema);
export default Receipt;
