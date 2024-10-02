const Medicine = require("../models/MedicineSchema");
const User = require("../models/User");

const getUserMedicines = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate("medicines");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ medicines: user.medicines });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const addMedicine = async (req, res) => {
  const { medicineName,description, image } = req.body;
  console.log(medicineName);
  try {
    if (!req.params.userid)
      return res.status(400).json({ message: "request not found" });
    const user = await User.findById(req.params.userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newMedicine = new Medicine({
      medicineName,
      description,
      image,
    });
   
    const savedMedicine = await newMedicine.save();
    user.medicines.push(savedMedicine._id);
    await user.save();
    res
      .status(201)
      .json({ message: "Medicine added", medicine: savedMedicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const eventAddion = async (req, res) => {
  const { dosage, time, frequency, } =
    req.body;
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {  dosage, time, frequency },
      { new: true }
    );

    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({ message: "Medicine updated", medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


const updateMedicine = async (req, res) => {
  const { medicineName, dosage, time, frequency, description, image } =
    req.body;
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { medicineName, dosage, time, frequency, description, image },
      { new: true }
    );

    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });

    res.status(200).json({ message: "Medicine updated", medicine });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });
    await User.updateOne(
      { _id: req.params.id },
      { $pull: { medicines: req.params._id } }
    );
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
  eventAddion
};