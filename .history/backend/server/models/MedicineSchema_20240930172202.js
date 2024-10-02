const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,  
      trim: true       
    },
    dosage: {
      type: String,
      required: true,  
      trim: true
    },
    time: [{
      type:String,
      required: true   
    }],
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"], 
      required: true
    },
    notes: {
      type: String,   
      trim: true
    },
  },
  {
    timestamps: true  
  }
);

module.exports = mongoose.model("Medicine", MedicineSchema);
