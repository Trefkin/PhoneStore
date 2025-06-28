const express = require("express");
const router = express.Router();
const phoneController = require("../controllers/phoneController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", phoneController.getPhones);
router.post("/", protect, phoneController.createPhone);
router.get("/:id", phoneController.getPhone);
router.put("/:id", protect, phoneController.updatePhone);
router.delete("/:id", protect, phoneController.deletePhone);

module.exports = router;