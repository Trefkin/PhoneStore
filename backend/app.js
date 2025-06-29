const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://medyanes.vercel.app"],
  credentials: true,
}));
app.use(express.json()); // <-- Bu mütləq olmalıdır

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/phones", require("./routes/phoneRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));