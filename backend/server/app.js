require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/auth");
const medicineRouter = require("./routers/medicine");
const dataBase = require("./DB/dataBase");
const medicineController = require('./controllers/medicine');
const app = express();

// Enable CORS for all routes before any route handling
app.use(cors()); // Make sure this is above all route definitions

// Serve static files for image uploads
app.use('/uploads', express.static('uploads'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes and file upload handling
app.post('/medicine/:userid', medicineController.upload.single('image'), medicineController.addMedicine);

// Routers
app.use("/auth", authRouter);
app.use("/medicine", medicineRouter);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
    dataBase();
});
