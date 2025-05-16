// scripts/createAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/User");

async function run() {
  // 1. Veritabanına bağlan
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB bağlantısı OK");

  // 2. Şifrenin hash’ini üret
  const plainPassword = "1142"; // istediğin şifreyi buraya yaz
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // 3. Admin kullanıcısını oluştur
  const existing = await User.findOne({ email: "dilaybagrisen@eventapp.com" });
  if (existing) {
    console.log("⚠️ dilaybagrisen@eventapp.com zaten var. Güncellemiyorum.");
  } else {
    const adminUser = new User({
      email: "dilaybagrisen@eventapp.com",
      password: hashedPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log(
      "🎉 Admin kullanıcı oluşturuldu: dilaybagrisen@eventapp.com / 1142"
    );
  }

  // işimiz bitti, bağlantıyı kapat
  await mongoose.disconnect();
  console.log("🔌 MongoDB bağlantısı kapatıldı");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
