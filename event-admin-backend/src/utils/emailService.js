// src/utils/emailService.js
require("dotenv").config(); // En başta .env'i yükle
const sgMail = require("@sendgrid/mail");

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey || !apiKey.startsWith("SG.")) {
  console.error("⚠️ SENDGRID_API_KEY eksik veya yanlış:", apiKey);
} else {
  sgMail.setApiKey(apiKey);
}

async function sendWelcomeEmail(to, tempPassword) {
  console.log(">> sendWelcomeEmail çağrıldı:", to, tempPassword);
  const msg = {
    to,
    from: process.env.EMAIL_FROM, // .env içinde doğruladığın adres
    subject: "EventAdmin’e Hoş Geldiniz!",
    html: `
      <p>Merhaba,</p>
      <p>Hesabınız oluşturuldu. İlk kez giriş yapmak için:</p>
      <ul>
        <li><strong>Email:</strong> ${to}</li>
        <li><strong>Geçici Şifre:</strong> ${tempPassword}</li>
      </ul>
      <p><a href="${process.env.FRONTEND_URL}/login">Admin Paneline Git</a></p>
      <p>Giriş yaptıktan sonra şifrenizi değiştirmenizi öneririz.</p>
    `,
  };

  try {
    const [response] = await sgMail.send(msg);
    console.log("✅ Mail gönderildi. Status code:", response.statusCode);
  } catch (err) {
    // Hata detayını yazdır
    const detail = err.response?.body || err.message;
    console.error("❌ Mail gönderilemedi:", detail);
  }
}

module.exports = { sendWelcomeEmail };
