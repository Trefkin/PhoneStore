const Phone = require("../models/Phone");

// Bütün telefonlar
exports.getPhones = async (req, res) => {
  const phones = await Phone.find().populate("userId", "email");
  res.json(phones);
};

// Tək telefon
exports.getPhone = async (req, res) => {
  const phone = await Phone.findById(req.params.id).populate("userId", "email");
  if (!phone) return res.status(404).json({ error: "Tapılmadı" });
  res.json(phone);
};

// Yeni telefon əlavə et
exports.createPhone = async (req, res) => {
  const { name, brand, price, description, imageUrl } = req.body;
  const phone = await Phone.create({
    name,
    brand,
    price,
    description,
    imageUrl,
    userId: req.user.id,
  });
  res.status(201).json(phone);
};

// Telefonu yenilə
exports.updatePhone = async (req, res) => {
  const phone = await Phone.findById(req.params.id);
  if (!phone) return res.status(404).json({ error: "Tapılmadı" });
  if (phone.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "İcazə yoxdur" });

  Object.assign(phone, req.body);
  await phone.save();
  res.json(phone);
};

// Telefonu sil
exports.deletePhone = async (req, res) => {
  const phone = await Phone.findById(req.params.id);
  if (!phone) return res.status(404).json({ error: "Tapılmadı" });
  if (phone.userId.toString() !== req.user.id)
    return res.status(403).json({ error: "İcazə yoxdur" });

  await phone.deleteOne();
  res.json({ message: "Silindi" });
};