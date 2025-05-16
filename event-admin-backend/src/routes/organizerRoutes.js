// routes/organizerRoutes.js
const router = require("express").Router();
const {
  createOrganizer,
  getAllOrganizers,
  deleteOrganizer,
  // ileride: updateOrganizer, deleteOrganizer
} = require("../controllers/organizerController");
const auth = require("../middlewares/authMiddleware");

// Yeni organizatör ekleme
router.post("/", auth(["admin"]), createOrganizer);

// **Eksik olan**: tüm organizatörleri listeleme
router.get("/", auth(["admin"]), getAllOrganizers);
router.delete("/:id", auth(["admin"]), deleteOrganizer);
// İleride eklenecek:
// router.put('/:id', auth(['admin']), updateOrganizer);
// router.delete('/:id', auth(['admin']), deleteOrganizer);

module.exports = router;
