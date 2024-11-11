import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image_url: { type: String },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  vitamins: {
    vitamin_C: { type: String, default: '0 mg' },
    vitamin_A: { type: String, default: '0 IU' },
  },
  minerals: {
    calcium: { type: String, default: '0 mg' },
    iron: { type: String, default: '0 mg' },
  },
  description: { type: String },
  category: { type: String },
  stock_quantity: { type: Number, default: 0 },
  price: { type: Number, required: true, default: 0 },
  discounted_price: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  is_available: { type: Boolean, default: true },
});

// Create the model if it doesn't already exist
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
