const express = require("express");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// SEND MESSAGE
router.route("/").post(protect, sendMessage);

//GET ALL MESSAGES
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
