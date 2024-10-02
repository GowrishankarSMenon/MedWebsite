require("dotenv").config();
const express = require("express");
const cors = require('cors');
const authRouter = require("./routers/auth");
const medicineRouter = require("./routers/medicine");
const dataBase = require("./DB/dataBase");

const app = express();
app.post('/medicine/:userid', medicineController.upload.single('image'), medicineController.addMedicine);
app.use(cors({
    origin: '*', // Allow all origins (not recommended for production)
    credentials: true
}));

app.use('/uploads', express.static('uploads')); // Serve static files for image uploads
app.use(express.json());

// Routers
app.use("/auth", authRouter);
app.use("/medicine", medicineRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server started on port:", PORT);
    dataBase();
});
