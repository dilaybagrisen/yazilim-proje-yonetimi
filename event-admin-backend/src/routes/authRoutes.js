const router = require("express").Router();
const { login, resetPassword, forgotPassword } = require("../controllers/authController");

// Admin / Organizer / Customer login
// POST /api/auth/login
router.post("/login", login);

router.post("/reset-password", resetPassword);

router.post("/forgot-password", forgotPassword);

// (İleride gerekirse) şifre sıfırlama, logout vb. route’ları buraya ekleyebilirsin.

module.exports = router;
