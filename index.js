const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();
const connectDB = require('./db');
const fileUpload = require('express-fileupload');

const app = express();

// Middleware
app.use(cors());
app.use(compression()); // Compress all routes [6]
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// Connect to MongoDB
connectDB();

// Route imports (all from ./routes)
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const appointmentRoutes = require('./routes/appointments');
const clinicRoutes = require('./routes/clinics');
const notificationRoutes = require('./routes/notifications');
const chatbotRoutes = require('./routes/chatbot');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('MedPal API Running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});