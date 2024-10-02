require("dotenv").config();
const express = require("express");
const cors = require('cors'); // Import the CORS package


// Enable CORS for all routes

const authRouter = require("./routers/auth");
const medicineRouter=require("./routers/medicine");
const dataBase = require("./DB/dataBase");

const app = express();
app.use(cors({
    origin: '*', // Allow all origins (not recommended for production)
    credentials: true
}));
app.use('/uploads', express.static('uploads'));
app.use(express.json())



app.use("/auth", authRouter);
app.use("/medicine",medicineRouter);




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server started on port :", PORT)
    dataBase();
})