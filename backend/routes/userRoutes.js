const express = require("express");
const router = express.Router();
const {
  createOrUpdateUser,
  checkUsernameAvailability,
} = require("../controllers/userController");

router.post("/submit", createOrUpdateUser);
router.get("/check-username-availability", checkUsernameAvailability);

module.exports = router;
