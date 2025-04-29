    const Turf = require("../models/Turf");

    exports.createTurf = async (req, res) => {
    const { name, description, address, locationId, votes, rating, phoneNumber, price } = req.body;
    const photos = req.files.map((file) => file.path);
    console.log(req.files);
    const turf = await Turf.create({ name, description, address, locationId, photos, votes, rating, phoneNumber, price });
    res.json(turf);
    };

    exports.getAllTurfs = async (req, res) => {
    const turfs = await Turf.find().populate("locationId");
    res.json(turfs);
    };

    // 🚀 Add this function to get a single turf
exports.getTurfById = async (req, res) => {
    try {
      const turf = await Turf.findById(req.params.id).populate("locationId");
      if (!turf) {
        return res.status(404).json({ message: "Turf not found" });
      }
      res.json(turf);
    } catch (error) {
      console.error('Error fetching turf by ID:', error);
      res.status(500).json({ message: "Server error" });
    }
  };