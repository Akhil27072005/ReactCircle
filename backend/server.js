const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

const authRoutes = require('./routes/authRoute');
const profileRoute = require('./routes/profileRoute');
const postRoute = require('./routes/postRoute');
require("./controllers/passport");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile',profileRoute);
app.use('/api/posts', postRoute);
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());


app.get('/',(req,res) => {
    res.send("API is running");
});

console.log('MONGO_URI is:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MonogDB connected"))
.catch(err => console.error(err));

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
});