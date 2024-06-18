const express = require("express");
const router = express.Router();
const { searchItems } = require("../controllers/itemController");

// Defines the search route
router.get("/search", searchItems);

module.exports = router;
