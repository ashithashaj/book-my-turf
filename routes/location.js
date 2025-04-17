const router = require("express").Router();
const Location = require("../models/Location");

// POST: Create a location
router.post("/", async (req, res) => {
  try {
    const { name, city, state } = req.body;
    const location = await Location.create({ name, city, state });
    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create location" });
  }
});

// ✅ GET: Fetch all locations
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

module.exports = router;
