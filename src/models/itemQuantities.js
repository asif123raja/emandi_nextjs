import mongoose from "mongoose";

// Define the schema for seller-specific item quantities
const sellerItemQuantitySchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  itemQuantities: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});

const SellerItemQuantity = mongoose.models.SellerItemQuantity || mongoose.model("SellerItemQuantity", sellerItemQuantitySchema);
export default SellerItemQuantity;
