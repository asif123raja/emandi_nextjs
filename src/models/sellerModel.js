import mongoose from "mongoose";

// Define the seller schema
const sellerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    shopName: {
        type: String,
        required: [true, "Please provide a shop name"],
    },
    shopAddress: {
        type: String,
        required: [true, "Please provide a shop address"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
});

// Create the model, or use the existing one if already defined
const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);

export default Seller;
