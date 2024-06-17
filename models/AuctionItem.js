const mongoose = require("mongoose");

const AuctionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_price: {
    type: Number,
    required: true,
  },
  reserve_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("AuctionItem", AuctionItemSchema);
