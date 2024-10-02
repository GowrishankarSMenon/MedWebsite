const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      trim: true,
      required: true
    },
    dosage: {
      type: String,
      trim: true
    },
    time: [{
      type: String
    }],
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"]
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String // Store the path to the image
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Medicine", MedicineSchema);
