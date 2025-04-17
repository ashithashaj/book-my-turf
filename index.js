require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const locationRoutes = require("./routes/location");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/turfs", require("./routes/turf"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
