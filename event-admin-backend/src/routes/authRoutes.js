const router = require("express").Router();
const { login } = require("../controllers/authController");

// Admin / Organizer / Customer login
// POST /api/auth/login
router.post("/login", login);

// (İleride gerekirse) şifre sıfırlama, logout vb. route’ları buraya ekleyebilirsin.

module.exports = router;
