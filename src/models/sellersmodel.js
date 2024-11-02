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
    contactNumber: {
        type: String,
        required: [true, "Please provide a contact number"],
        unique: true,
    },
    businessRegNumber: {
        type: String,
        required: [true, "Please provide a business registration number"],
        unique: true,
    },
    taxIdNumber: {
        type: String,
        required: [true, "Please provide a tax ID number"],
        unique: true,
    },
    regionOfOperation: {
        type: String,
        required: [true, "Please specify the region of operation"],
    },
    bankAccountDetails: {
        accountNumber: {
            type: String,
            required: [true, "Please provide a bank account number"],
        },
        bankName: {
            type: String,
            required: [true, "Please provide the bank name"],
        },
        ifscCode: {
            type: String,
            required: [true, "Please provide the IFSC code"],
        },
    },
    businessLicenseNumber: {
        type: String,
        required: [true, "Please provide a business license number"],
        unique: true,
    },
    pinCode: {
        type: String,
        required: [true, "Please provide a pin code"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update timestamps on save
sellerSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model, or use the existing one if already defined
const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);

export default Seller;
