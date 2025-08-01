const aiService=require('../services/ai.service');

module.exports.getReview =async (req, res) => {
  const code = req.body.code; // code user na jo entr kiya ha  ko query se lete hain
  if (!code) {
    return res.status(400).send('code is required');
  }
const response = await aiService.generateContent(code); // aiService se content generate karte hain
  if (!response) {
    return res.status(500).send('Error generating content');
  }
  res.send({ response }); // Response ko send karte hain
};