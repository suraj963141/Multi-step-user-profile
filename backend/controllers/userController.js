const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.query;
  try {
    const existingUser = await User.findOne({ username });
    res.json({ available: !existingUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createOrUpdateUser = async (req, res) => {
  try {
    const {
      username,
      currentPassword,
      newPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
    } = req.body;

    if (!req.files || !req.files.profilePhoto) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    const profilePhoto = req.files.profilePhoto;
    const validTypes = ["image/jpeg", "image/png"];
    if (
      !validTypes.includes(profilePhoto.mimetype) ||
      profilePhoto.size > 2 * 1024 * 1024
    ) {
      return res.status(400).json({ message: "Invalid file format or size" });
    }

   
    const uploadsDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const filename = `${Date.now()}_${profilePhoto.name}`;
    const uploadPath = path.join(uploadsDir, filename);
    await profilePhoto.mv(uploadPath);

    const hashedPassword = await bcrypt.hash(currentPassword, 10);

   
    if (newPassword) {
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message:
            "New password must be at least 8 characters long and contain at least one number and one special character.",
        });
      }
    }

    const hashedNewPassword = newPassword
      ? await bcrypt.hash(newPassword, 10)
      : undefined;

    const user = new User({
      profilePhoto: `uploads/${filename}`,
      username,
      currentPassword: hashedPassword,
      newPassword: hashedNewPassword,
      profession,
      companyName,
      addressLine1,
      country,
      state,
      city,
      subscriptionPlan,
      newsletter,
    });

    await user.save();
    res.status(201).json({ message: "User profile saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
