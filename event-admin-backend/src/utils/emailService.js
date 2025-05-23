/*const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (to, tempPassword) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Hoş geldiniz! Giriş Bilgileriniz",
    html: `<p>Merhaba,</p>
           <p>Hesabınız oluşturuldu. Geçici şifreniz: <strong>${tempPassword}</strong></p>`,
  };
  await sgMail.send(msg);
};

module.exports = { sendWelcomeEmail };

*/

// src/utils/emailService.js

// E-posta özelliğini şimdilik pas geçiyoruz:
async function sendWelcomeEmail(to, content) {
  console.log(
    `(stub) sendWelcomeEmail → to=${to}, content=${content}`
  );
}

module.exports = { sendWelcomeEmail };
