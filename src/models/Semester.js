const mongoose = require("mongoose");

// Schema
const semesterSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    numberOfWeek: {
      type: Number,
      required: true,
      default: 15,
    },
    isOpening: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.model("Semester", semesterSchema);
