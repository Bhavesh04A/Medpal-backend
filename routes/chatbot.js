const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/chatbot
router.post('/', async(req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    try {
        const geminiRes = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent", {
                contents: [{
                    parts: [{
                        text: `A user describes these symptoms: "${message}".
Respond as a friendly, caring health assistant.
- Use natural, conversational language and contractions.
- Vary your phrasing.
- Mirror the user's tone and sentiment.
- Show empathy if the user is worried.
- If symptoms are serious, gently recommend seeing a doctor.
- Use light emojis if appropriate, but keep it professional.
- If unsure, express it naturally (e.g., "That's a tough one, but here's what I think...").
`
                    }]
                }]
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    key: process.env.GEMINI_API_KEY
                }
            }
        );


        let botReply = "Sorry, I couldn't process that.";
        if (
            geminiRes.data &&
            geminiRes.data.candidates &&
            geminiRes.data.candidates[0] &&
            geminiRes.data.candidates[0].content &&
            geminiRes.data.candidates[0].content.parts &&
            geminiRes.data.candidates[0].content.parts[0] &&
            geminiRes.data.candidates[0].content.parts[0].text
        ) {
            botReply = geminiRes.data.candidates[0].content.parts[0].text;
        }
        res.json({ reply: botReply });

    } catch (err) {
        if (err.response && err.response.data) {
            console.error(err.response.data);
        } else {
            console.error(err.message);
        }
        res.status(500).json({ error: "Failed to get AI response" });
    }
});

module.exports = router;