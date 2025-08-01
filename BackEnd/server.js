require("dotenv").config(); // dotenv ko import krte hain taake environment variables use kar sakein

const app = require('./src/app'); 

// Use environment PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {  // app.listen ka mtlb ha tm server ko start krdo
  console.log(`Server is running on port ${PORT}`);
}); 

// Export for Vercel serverless
module.exports = app;