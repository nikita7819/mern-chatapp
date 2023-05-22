const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

//CREATE CHAT OR ACCESS A CHAT
router.route("/").post(protect, accessChat);

//GET ALL CHATS
router.route("/").get(protect, fetchChats);

//CREATE A GRP CHAT
router.route("/group").post(protect, createGroupChat);

//RENAME A CHAT
router.route("/rename").put(protect, renameGroup);

//REMOVE FROM GRP
router.route("/groupremove").put(protect, removeFromGroup);

//ADD TO GRP
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
