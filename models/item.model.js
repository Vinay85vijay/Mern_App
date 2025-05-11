const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    imagePath: {type:String} 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
