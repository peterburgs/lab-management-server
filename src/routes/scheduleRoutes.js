const express = require("express");
const mongoose = require("mongoose");
const schedule = require("../utils/scheduleGeneration");
// Import Models
const lab = mongoose.model("Lab");
const teaching = mongoose.model("Teaching");

const router = express.Router();

// GET Method: get schedule that is generated by system
router.get("/", async (req, res) => {
  try {
    const labs = await lab.find({}).exec();
    const teachings = await teaching
      .find({})
      .populate("course")
      .exec();
    const _schedule = schedule(labs, teachings, 15);

    if (_schedule) {
      res.status(200).json({
        message: "Successfully generate schedule",
        schedule: _schedule,
      });
    }
    console.log(_schedule);
  } catch (err) {
    res.status(500).json({
      message: "Cannot get",
      error: err.message,
    });
  }
});

// Export
module.exports = router;
