require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const VolunteerModel = require("./models/volunteer");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas using the .env variable
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected Successfully"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    VolunteerModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record exists");
        }
    })
    .catch(err => res.json(err));
});

// Register Route
app.post("/register", (req, res) => {
    VolunteerModel.create(req.body)
    .then(volunteers => res.json(volunteers))
    .catch(err => res.json(err));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
