const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//REGISTER USER &&
router.route("/").post(registerUser).get(protect, allUsers);

//LOGIN USER
router.post("/login", authUser);

module.exports = router;
