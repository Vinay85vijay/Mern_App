const Item = require('../models/item.model');

exports.getItems = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortField = query.sortBy || 'createdAt';
  const sortOrder = query.order === 'desc' ? -1 : 1;

  const filter = {};
  if (query.name) filter.name = { $regex: query.name, $options: 'i' };
  if (query.inStock) filter.inStock = query.inStock === 'true';

  const [items, total] = await Promise.all([
    Item.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
    Item.countDocuments(filter)
  ]);

  return {
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    items
  };
};

exports.getItem = async (query) => {
  if (query.match(/^[0-9a-fA-F]{24}$/)) {
    return await Item.findById(query);
  }
  return await Item.findOne({ name: query.trim() });
};

exports.createItem = async (data) => {
  const existingItem = await Item.findOne({ name: data.name.trim() });
  if (existingItem) return { exists: true, item: existingItem };

  const item = new Item(data);
  await item.save();
  return { exists: false, item };
};

exports.updateItem = (id, data) => {
  return Item.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

exports.deleteItem = (id) => Item.findByIdAndDelete(id);
