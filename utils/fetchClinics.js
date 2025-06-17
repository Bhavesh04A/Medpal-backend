const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Text Search: Find clinics/hospitals by name or city
async function fetchClinicsByName(query) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
        const res = await axios.get(url);
        return res.data.results || [];
    } catch (err) {
        console.error("Google Places API error:", err.message);
        return [];
    }
}

// Nearby Search: Find clinics/hospitals near a location
async function fetchNearbyClinics(lat, lng) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&key=${GOOGLE_API_KEY}`;
        const res = await axios.get(url);
        return res.data.results || [];
    } catch (err) {
        console.error("Google Places API error:", err.message);
        return [];
    }
}

module.exports = { fetchClinicsByName, fetchNearbyClinics };