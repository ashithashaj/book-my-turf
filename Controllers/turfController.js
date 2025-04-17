const Turf = require("../models/Turf");

exports.createTurf = async (req, res) => {
  const { name, description, address, locationId } = req.body;
  const photos = req.files.map((file) => file.path);
  const turf = await Turf.create({ name, description, address, locationId, photos });
  res.json(turf);
};

exports.getAllTurfs = async (req, res) => {
  const turfs = await Turf.find().populate("locationId");
  res.json(turfs);
};
