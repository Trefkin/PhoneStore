// backend/routes/items.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Item = require("../models/Item");

// GET bütün telefonlar
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST yeni telefon (yalnız login olan user üçün)
router.post("/", protect, async (req, res) => {
  const { name, brand, price, description, imageUrl } = req.body;
  const item = await Item.create({
    name,
    brand,
    price,
    description,
    imageUrl,
    user: req.user.id,
  });
  res.status(201).json(item);
});

module.exports = router;

//   const phone = await prisma.phone.create({
//     data: {
//       name,
//       brand,
//       price,
//       description,
//       imageUrl,
//       userId,
//     },
//   });
//   console.log("CREATED PHONE:", phone);
//   return NextResponse.json(phone, { status: 201 });
// }