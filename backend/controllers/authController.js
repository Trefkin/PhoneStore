const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email və şifrə tələb olunur" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(409).json({ error: "Bu email artıq istifadə olunur" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  res.status(201).json({ id: user._id, email: user.email });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email və şifrə tələb olunur" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Email və ya şifrə yanlışdır" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Email və ya şifrə yanlışdır" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email } });
};