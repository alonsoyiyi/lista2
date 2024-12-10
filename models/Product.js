import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  owner: { type: String, default: '' }
}, { collection: 'lista' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

