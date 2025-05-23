// src/controllers/organizerController.js

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
const Profile = require("../models/Profile");
const { sendWelcomeEmail } = require("../utils/emailService");

exports.createOrganizer = async (req, res) => {
  const { email, company, address, phone, firstName, lastName } = req.body;

  try {
    // 1) Geçici şifre oluştur ve hash’le
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(tempPassword, 10);

    // 2) Profile & User oluştur
    const profile = new Profile({ firstName, lastName });
    await profile.save();

    const user = new User({
      email,
      password: hashed,
      role: "organizer",
      profile: profile._id,
    });
    await user.save();

    // 3) Organizer kaydını oluştur
    const organizer = new Organizer({
      user: user._id,
      company,
      address,
      phone,
    });
    await organizer.save();

    // 4) Hoş geldin e-postası gönder (hata olsa bile akışı bozma)
    try {
      await sendWelcomeEmail(email, tempPassword);
    } catch (mailErr) {
      console.error("Mail gönderilemedi:", mailErr.message);
      // TODO: in-app notification için burada bir kayıt saklayabilirsiniz
    }

    // 5) Yanıtla
    return res.status(201).json(organizer);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Sunucu hatası: organizatör oluşturulamadı." });
  }
};

exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().populate({
      path: "user",
      select: "email role",
      populate: { path: "profile", select: "firstName lastName" },
    });
    return res.json(organizers);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Sunucu hatası: organizatörler alınamadı." });
  }
};

exports.updateOrganizer = async (req, res) => {
  const { id } = req.params;
  const { email, company, address, phone, firstName, lastName } = req.body;

  try {
    // 1) Organizörü ve ilişkili user’ı çek
    const org = await Organizer.findById(id).populate("user");
    if (!org) {
      return res.status(404).json({ msg: "Organizör bulunamadı" });
    }

    // 2) Organizer bilgilerini güncelle
    org.company = company ?? org.company;
    org.address = address ?? org.address;
    org.phone = phone ?? org.phone;
    await org.save();

    // 3) User email’ini güncelle
    const user = await User.findById(org.user._id).populate("profile");
    if (email) {
      user.email = email;
      await user.save();
    }

    // 4) Profile ad/soyad bilgilerini güncelle
    const profile = await Profile.findById(user.profile);
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    await profile.save();

    // 5) Güncellenmiş kaydı tekrar dön
    const updated = await Organizer.findById(id).populate({
      path: "user",
      select: "email role",
      populate: { path: "profile", select: "firstName lastName" },
    });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Sunucu hatası: organizatör güncellenemedi." });
  }
};

exports.deleteOrganizer = async (req, res) => {
  const { id } = req.params;

  try {
    // 1) Organizörü user.profile ile beraber çek
    const org = await Organizer.findById(id).populate({
      path: "user",
      select: "profile",
    });
    if (!org) {
      return res.status(404).json({ msg: "Organizör bulunamadı" });
    }

    const userId = org.user._id;
    const profileId = org.user.profile;

    // 2) Organizer’ı sil
    await Organizer.findByIdAndDelete(id);

    // 3) User’ı sil
    await User.findByIdAndDelete(userId);

    // 4) Profile varsa sil
    if (profileId) {
      await Profile.findByIdAndDelete(profileId);
    }

    return res.json({
      msg: "Organizör, kullanıcı ve profil başarıyla silindi.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "Sunucu hatası: silme işlemi tamamlanamadı." });
  }
};
