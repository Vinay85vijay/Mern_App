const itemService = require('../services/item.service');

exports.getItems = async (req, res) => {
  try {
    const result = await itemService.getItems(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await itemService.getItem(req.params.query);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    // Attach image path to body if file exists
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

          const itemData = {
            ...req.body,
            image: imageUrl
          };

    const { exists, item } = await itemService.createItem(itemData);

    if (exists) {
      return res.status(409).json({
        message: 'Product already exists. Check the details below',
        item
      });
    }

    res.status(201).json(item);
  } catch {
    res.status(400).json({ error: 'Invalid data' });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await itemService.deleteItem(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
};
