const { program } = require("commander");
const connectDB = require("./config/db");
const AuctionItem = require("./models/AuctionItem");
const seedData = require("./data/seedData");

connectDB();

program
  .command("seed")
  .description("Seed data into the database")
  .action(async () => {
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
  .command("delete")
  .description("Delete data from the database")
  .action(async () => {
    try {
      await AuctionItem.deleteMany();
      console.log("Data deleted successfully");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program.parse(process.argv);
