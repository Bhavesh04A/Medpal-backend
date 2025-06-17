const express = require('express');
const router = express.Router();
const { fetchClinicsByName, fetchNearbyClinics } = require('../utils/fetchClinics');

// GET /api/clinics/search
router.get('/search', async(req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing search query" });
    const results = await fetchClinicsByName(q);
    res.json(results);
});

// GET /api/clinics/nearby
router.get('/nearby', async(req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "Missing lat/lng" });
    const results = await fetchNearbyClinics(lat, lng);
    res.json(results);
});

module.exports = router;