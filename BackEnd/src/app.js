const express = require('express');
const aiRoutes = require('./routes/ai.routes'); // ai.routes ko import karte hain


const cors=require('cors'); // cors ko import karte hain taake cross-origin requests ko allow kar sakein
// express()  // jesa express ko calal krta ho to aik server create ho jata ha create hota ha server run nhi hota
const app = express(); // express ko call krne se aik server create hota ha
app.use(cors()); // cors middleware ko use karte hain taake cross-origin requests ko allow kar sakein

// test route bna rha aha kah server chl rah aha ya nhi
app.get('/', (req, res) => { // get request ka mtlb ha ke server ko kuch bhejna ha
  res.send('Server is running'); // jab server ko kuch bhejna ha to res.send() use hota ha
});


app.use(express.json()); // JSON data ko parse karne ke liye express.json() middleware use karte hain  isko us ena kro ga to req.body undefine raha ga 

app.use('/ai', aiRoutes); // '/ai' route ko aiRoutes se link karte hain

module.exports = app; // app ko export krte hain taake baqi files isko use kar sakein