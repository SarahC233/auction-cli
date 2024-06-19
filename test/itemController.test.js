const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const AuctionItem = require("../models/AuctionItem");
const itemController = require("../controllers/itemController");

jest.mock("../models/AuctionItem");

const app = express();
app.use(express.json());
app.get("/api/items/search", itemController.searchItems);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Item Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return items matching the search keyword", async () => {
    const items = [
      { title: "Antique Vase", description: "A beautiful antique vase." },
      { title: "Vintage Car", description: "A well-maintained vintage car." },
    ];

    AuctionItem.find.mockResolvedValue(items);

    const res = await request(app)
      .get("/api/items/search")
      .query({ keyword: "antique" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(items);
    expect(AuctionItem.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: /antique/i } },
        { description: { $regex: /antique/i } },
      ],
    });
  });

  it("should return 500 if there is an error", async () => {
    AuctionItem.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .get("/api/items/search")
      .query({ keyword: "antique" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "Database error" });
    expect(AuctionItem.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: /antique/i } },
        { description: { $regex: /antique/i } },
      ],
    });
  });
});
