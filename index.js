#!/usr/bin/env node

const { program } = require("commander");
const {
  seedDatabase,
  deleteAllData,
  addItem,
  deleteItem,
} = require("./cliCommands");
const connectDB = require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const AuctionItem = require("./models/AuctionItem");

// CLI Commands
program
  .command("seed <dbName>")
  .description("Seed data into the specified database")
  .action(async (dbName) => {
    try {
      await seedDatabase(dbName);
      process.exit();
    } catch (err) {
      process.exit(1);
    }
  });

program
  .command("delete <dbName>")
  .description("Delete all data from the specified database")
  .action(async (dbName) => {
    try {
      await deleteAllData(dbName);
      process.exit();
    } catch (err) {
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
    try {
      await addItem(dbName, options);
      process.exit();
    } catch (err) {
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
    try {
      await deleteItem(dbName, options.id);
      process.exit();
    } catch (err) {
      process.exit(1);
    }
  });

program
  .command("serve <dbName>")
  .description("Start the API server")
  .action(async (dbName) => {
    await connectDB(dbName);

    const app = express();
    app.use(bodyParser.json());

    // Search route
    app.get("/api/items/search", async (req, res) => {
      try {
        const { keyword } = req.query;
        const regex = new RegExp(keyword, "i"); // Case-insensitive regex for keyword search
        const items = await AuctionItem.find({
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
          ],
        });
        res.json(items);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });

program.parse(process.argv);
