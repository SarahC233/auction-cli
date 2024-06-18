const AuctionItem = require("../models/AuctionItem");

exports.searchItems = async (req, res) => {
  try {
    const { keyword } = req.query;
    const regex = new RegExp(keyword, "i"); // Case-insensitive regex for keyword search
    const items = await AuctionItem.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
