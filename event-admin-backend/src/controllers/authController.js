const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendWelcomeEmail } = require("../utils/emailService");
const User = require("../models/User");

// In-memory reset token store (for demo, production'da DB'de tutulmalı)
const resetTokens = {};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Kullanıcı bulunamadı" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Şifre yanlış" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Kullanıcı bulunamadı" });
  const token = crypto.randomBytes(32).toString("hex");
  resetTokens[token] = { userId: user._id, expires: Date.now() + 1000 * 60 * 15 };
  // E-posta yerine şimdilik konsola yaz
  console.log(`Şifre sıfırlama linki: http://localhost:3000/reset-password?token=${token}`);
  res.json({ msg: "Şifre sıfırlama bağlantısı e-posta ile gönderildi." });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const data = resetTokens[token];
  if (!data || data.expires < Date.now()) {
    return res.status(400).json({ msg: "Token geçersiz veya süresi dolmuş." });
  }
  const user = await User.findById(data.userId);
  if (!user) return res.status(400).json({ msg: "Kullanıcı bulunamadı." });
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  delete resetTokens[token];
  res.json({ msg: "Şifre başarıyla güncellendi." });
};
