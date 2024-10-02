const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      trim: true
    },
    dosage: {
      type: String,
      trim: true
    },
    time: [{
      type: String,

    }],
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
    },
    description: {
      type: String,
      trim: true
    },
    image:{
      type:String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Medicine", MedicineSchema);