const AuctionItem = require("./models/AuctionItem");
const seedData = require("./data/seedData");
const connectDB = require("./config/db");

const seedDatabase = async (dbName) => {
  await connectDB(dbName);
  try {
    await AuctionItem.deleteMany();
    await AuctionItem.insertMany(seedData);
    console.log("Data seeded successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteAllData = async (dbName) => {
  await connectDB(dbName);
  try {
    await AuctionItem.deleteMany();
    console.log("All data deleted successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const addItem = async (dbName, options) => {
  await connectDB(dbName);
  try {
    const newItem = new AuctionItem({
      title: options.title,
      description: options.description,
      start_price: options.start_price,
      reserve_price: options.reserve_price,
    });
    await newItem.save();
    console.log("New item added successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteItem = async (dbName, id) => {
  await connectDB(dbName);
  try {
    await AuctionItem.findByIdAndDelete(id);
    console.log(`Item with ID ${id} deleted successfully`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  seedDatabase,
  deleteAllData,
  addItem,
  deleteItem,
};
