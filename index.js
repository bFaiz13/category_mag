// server.js (Entry Point)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

// // Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', authenticate, categoryRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// app.get("/",(req,res)=> res.json({ message: 'Hello' }))
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
