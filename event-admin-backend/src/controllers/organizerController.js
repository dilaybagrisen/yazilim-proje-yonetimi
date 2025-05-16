const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
const Profile = require("../models/Profile");
const { sendWelcomeEmail } = require("../utils/emailService");

exports.createOrganizer = async (req, res) => {
  const { email, company, address, phone, firstName, lastName } = req.body;
  const tempPassword = Math.random().toString(36).slice(-8);
  const hashed = await bcrypt.hash(tempPassword, 10);

  const user = new User({ email, password: hashed, role: "organizer" });
  const profile = new Profile({ firstName, lastName });
  await profile.save();
  user.profile = profile._id;
  await user.save();

  const organizer = new Organizer({ user: user._id, company, address, phone });
  await organizer.save();

  await sendWelcomeEmail(email, tempPassword);
  // TODO: in-app notification kaydet

  res.status(201).json(organizer);
};

// Benzer şekilde getAll, update, delete metotları yazılır

exports.getAllOrganizers = async (req, res) => {
  try {
    // user ve profile verilerini de populate ediyoruz
    const organizers = await Organizer.find().populate({
      path: "user",
      select: "email role",
      populate: { path: "profile", select: "firstName lastName" },
    });
    res.json(organizers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Sunucu hatası: organizatörler alınamadı." });
  }
};

exports.deleteOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    // 1) Organizörü bul (profile id’sini almak için user’ı populate ediyoruz)
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
