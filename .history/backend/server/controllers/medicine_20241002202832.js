const Medicine = require("../models/MedicineSchema");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Setting destination for file upload.");
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: function (req, file, cb) {
    console.log("Setting filename for uploaded file.");
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  }
});

// Get medicines for a specific user
const getUserMedicines = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate("medicines");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ medicines: user.medicines });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new medicine
const addMedicine = async (req, res) => {
  try {
    console.log("User ID:", req.params.userid);
    console.log("File uploaded:", req.file);
    console.log("Request body:", req.body);

    if (!req.params.userid) {
      return res.status(400).json({ message: "Request not found" });
    }

    const user = await User.findById(req.params.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newMedicine = new Medicine({
      medicineName: req.body.medicineName,
      description: req.body.description,
      image: req.file ? req.file.path : null, // Save the uploaded image path
    });

    const savedMedicine = await newMedicine.save();
    user.medicines.push(savedMedicine._id);
    await user.save();
    res.status(201).json({ message: "Medicine added", medicine: savedMedicine });
  } catch (error) {
    console.error(error); // This will help catch any specific error message
    res.status(500).json({ message: "Server error", error });
  }
};


// Update a medicine
const updateMedicine = async (req, res) => {
  try {
    const updatedData = {
      medicineName: req.body.medicineName,
      description: req.body.description,
      dosage: req.body.dosage,
      time: req.body.time,
      frequency: req.body.frequency,
    };

    if (req.file) {
      updatedData.image = req.file.path; // Update image if provided
    }

    const medicine = await Medicine.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({ message: "Medicine updated", medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Event addition to medicine
const eventAddion = async (req, res) => {
  const { dosage, time, frequency } = req.body;
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { dosage, time, frequency },
      { new: true }
    );

    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.status(200).json({ message: "Medicine updated", medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    await User.updateOne({ _id: req.params.userid }, { $pull: { medicines: req.params.id } });
    res.status(200).json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getUserMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  eventAddion,
  upload // Export the multer middleware
};
