const mongoose = require("mongoose");
const {
  seedDatabase,
  deleteAllData,
  addItem,
  deleteItem,
} = require("../cliCommands");
const AuctionItem = require("../models/AuctionItem");
const seedData = require("../data/seedData");

jest.mock("../models/AuctionItem");

afterAll(async () => {
  await mongoose.connection.close();
});

describe("CLI Commands", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should seed data into the database", async () => {
    AuctionItem.deleteMany.mockResolvedValue();
    AuctionItem.insertMany.mockResolvedValue(seedData);

    await seedDatabase("testDB");

    expect(AuctionItem.deleteMany).toHaveBeenCalled();
    expect(AuctionItem.insertMany).toHaveBeenCalledWith(seedData);
  });

  it("should handle errors when seeding data", async () => {
    AuctionItem.deleteMany.mockRejectedValue(new Error("Error deleting data"));

    await expect(seedDatabase("testDB")).rejects.toThrow("Error deleting data");

    expect(AuctionItem.deleteMany).toHaveBeenCalled();
  });

  it("should add a new auction item", async () => {
    const newItem = {
      title: "Antique Clock",
      description: "A beautiful antique clock.",
      start_price: 150,
      reserve_price: 300,
    };

    AuctionItem.prototype.save = jest.fn().mockResolvedValue(newItem);

    await addItem("testDB", newItem);

    expect(AuctionItem.prototype.save).toHaveBeenCalled();
  });

  it("should delete a specific auction item by ID", async () => {
    AuctionItem.findByIdAndDelete.mockResolvedValue({ _id: "123" });

    await deleteItem("testDB", "123");

    expect(AuctionItem.findByIdAndDelete).toHaveBeenCalledWith("123");
  });
});
