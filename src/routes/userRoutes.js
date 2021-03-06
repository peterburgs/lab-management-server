const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

// Import Models
const User = mongoose.model("User");

const router = express.Router();

// Ensure Router use middleware
router.use(requireAuth);

// GET Method: get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({ isRemoved: false }).exec();
    if (result) {
      console.log(result);
      res.status(200).json({
        message: "Found",
        users: result,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: "Not Found",
      error: err.message,
    });
  }
});

// GET Method: get user by Id
router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findOne({ _id: id, isRemoved: false });
    if (user) {
      console.log(user);
      res.status(200).json({
        message: "Found",
        user,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: "Not found",
      error: err.message,
    });
  }
});

// POST Method Create a new User
router.post("/", async (req, res) => {
  const user = new User({
    _id: req.body.userId,
    fullName: req.body.fullName,
    email: req.body.email,
    isRemoved: req.body.isRemoved,
    roles: req.body.roles,
  });
  try {
    const result = await user.save();
    if (result) {
      res.status(201).json({
        message: "New User is Created",
        user: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Cannot created",
      err: err.message,
    });
  }
});

// PUT Method: Edit an existing User
router.put("/:userId", async (req, res) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const [key, val] of Object.entries(req.body)) {
    updateOps[key] = val;
  }
  try {
    const result = await User.findByIdAndUpdate(
      { _id: id, isRemoved: false },
      { $set: updateOps },
      { new: true }
    ).exec();
    if (result) {
      res.status(201).json({ user: result });
    }
  } catch (err) {
    res.status(500).json({
      message: "Cannot created",
      err: err.message,
    });
  }
});

// Delete Method: Delete an existing User
router.delete("/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const result = await User.findByIdAndUpdate(
      { _id: id, isRemoved: false },
      { $set: { isRemoved: true } }
    ).exec();
    if (result) {
      res.status(201).json({ user: result });
    }
  } catch (err) {
    res.status(500).json({
      message: "Cannot created",
      err: err.message,
    });
  }
});
// Export

module.exports = router;
