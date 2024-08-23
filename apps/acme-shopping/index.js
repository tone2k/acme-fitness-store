require('dotenv').config()
const express = require("express");
const app = express();

// app.get('/js/config.js', (req, res) => {
//     const config = {
//         env: {
//             serverUrl: process.env.SERVER_URL
//         }
//     }
//     res.send(`
//         config = ${JSON.stringify(config)}
//     `)
// });

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
