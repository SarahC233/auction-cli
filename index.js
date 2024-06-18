#!/usr/bin/env node

const { program } = require("commander");
const connectDB = require("./config/db");
const AuctionItem = require("./models/AuctionItem");
const seedData = require("./data/seedData");

const connectDatabase = async (dbName) => {
  await connectDB(dbName);
};

program
  .command("seed <dbName>")
  .description("Seed data into the specified database")
  .action(async (dbName) => {
    await connectDatabase(dbName);
    try {
      await AuctionItem.deleteMany();
      await AuctionItem.insertMany(seedData);
      console.log("Data seeded successfully");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program
  .command("delete <dbName>")
  .description("Delete all data from the specified database")
  .action(async (dbName) => {
    await connectDatabase(dbName);
    try {
      await AuctionItem.deleteMany();
      console.log("All data deleted successfully");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program
  .command("add <dbName>")
  .description("Add a new auction item to the specified database")
  .requiredOption("-t, --title <title>", "Title of the auction item")
  .requiredOption(
    "-d, --description <description>",
    "Description of the auction item"
  )
  .requiredOption(
    "-s, --start_price <start_price>",
    "Starting price of the auction item"
  )
  .requiredOption(
    "-r, --reserve_price <reserve_price>",
    "Reserve price of the auction item"
  )
  .action(async (dbName, options) => {
    await connectDatabase(dbName);
    try {
      const newItem = new AuctionItem({
        title: options.title,
        description: options.description,
        start_price: options.start_price,
        reserve_price: options.reserve_price,
      });
      await newItem.save();
      console.log("New item added successfully");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program
  .command("delete-item <dbName>")
  .description(
    "Delete a specific auction item by ID from the specified database"
  )
  .requiredOption("-i, --id <id>", "ID of the auction item to delete")
  .action(async (dbName, options) => {
    await connectDatabase(dbName);
    try {
      await AuctionItem.findByIdAndDelete(options.id);
      console.log(`Item with ID ${options.id} deleted successfully`);
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program.parse(process.argv);
