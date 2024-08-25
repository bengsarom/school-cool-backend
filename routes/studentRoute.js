const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createStudent,
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createStudent);
router.patch("/:id", protect, upload.single("image"), updateStudent);
router.get("/", protect, getStudents);
router.get("/:id", protect, getStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
