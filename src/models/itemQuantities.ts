// // models/SellerItemQuantity.ts
// import mongoose, { Schema, Document } from "mongoose";
// // import { Product } from "./productModel";

// export interface SellerItemQuantity extends Document {
//   sellerId: mongoose.Types.ObjectId;
//   pinCode: string;
//   itemQuantities: { itemId: mongoose.Types.ObjectId; quantity: number }[];
// }

// const SellerItemQuantitySchema = new Schema<SellerItemQuantity>({
//   sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
//   pinCode: { type: String, required: true },
//   itemQuantities: [
//     {
//       itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
// });

// export default mongoose.models.SellerItemQuantity ||
//   mongoose.model<SellerItemQuantity>("SellerItemQuantity", SellerItemQuantitySchema);

import mongoose, { Schema, Document } from "mongoose";

export interface SellerItem {
  itemId: mongoose.Types.ObjectId;
  sellerSKU: string;
  quantity: number;
}

export interface SellerItemQuantity extends Document {
  sellerId: mongoose.Types.ObjectId;
  pinCode: string; // Single pincode for query consistency
  pinCodes: string[]; // Allow up to 10 pincodes
  itemQuantities: SellerItem[];
}

const SellerItemQuantitySchema = new Schema<SellerItemQuantity>({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  
  pinCode: { type: String, required: true }, // ✅ Add single pincode field

  pinCodes: {
    type: [String],
    validate: [pincodeLimit, "{PATH} exceeds the limit of 10 pincodes"],
    required: true,
  },
  
  itemQuantities: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      sellerSKU: { type: String, required: true }, // Removed `unique: false` (not needed)
      quantity: { type: Number, required: true },
    },
  ],
});

// Custom validator to restrict pincodes to 10
function pincodeLimit(val: string[]) {
  return val.length <= 10;
}

export default mongoose.models.SellerItemQuantity ||
  mongoose.model<SellerItemQuantity>("SellerItemQuantity", SellerItemQuantitySchema);
