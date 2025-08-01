const express = require('express');
const aiController = require('../controllers/ai.controller'); // ai.controller ko import karte hain
const router = express.Router();

// jo itna hissa ha code ka ya route ha   router.get('/get-response',  is sa aga jitna bhi code ha wo controller ha is liya ma usa utha kr controller ma  la kr ja raha hon
// router.get('/get-response',aiController.getresponse); // get-response route ko aiController ke getresponse function se link karte hain)
    // (req, res) => {
//   const prompt = req.query.prompt; // Prompt ko query se lete hain
//   if (!prompt) {
//     return res.status(400).send('Prompt is required');
//   }

// });

router.post('/get-review', aiController.getReview); // get-response route ko aiController ke getresponse function se link karte hain

module.exports = router