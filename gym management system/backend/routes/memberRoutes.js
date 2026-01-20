const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
  getMe,
  updateMe
} = require("../controllers/memberController");
const auth = require('../middleware/authMiddleware');

router.post("/register", registerMember);
router.post("/login", loginMember);

// protected
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);

module.exports = router;
