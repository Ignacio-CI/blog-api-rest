const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
console.log('Node App is running');

// Connect to database
connection();

// Create Node server
const app = express();
const port = 3900;

// Configurate cors
app.use(cors());

// Convert req body to JS object
app.use(express.json()); // to get data with content-type app/json
app.use(express.urlencoded({ extended: true })); // to get data with form-urlencoded

// ROUTES
const articleRoutes = require('./routes/Article');

// Load routes
app.use('/api', articleRoutes);


// Test routes
// Sending back html elements
// app.get('/test', (req, res) => {
//     console.log('Executing test')
//     return res.status(200).send(`
//         <div>
//             <h1>Testing route NodeJS</h1>
//             <p>Creating api rest with Node</p>
//         </div>
//     `);
// })

// app.get('/test', (req, res) => {
//     console.log('Executing test')
//     return res.status(200).send([{
//         course: "Master in React",
//         author: "Ignacio Cerda",
//         url: "http://www.ignition.dev",
//     },
//     {
//         course: "Master in Vuejs",
//         author: "Ignacio Cerda",
//         url: "http://www.ignition.dev",
//     }]);
// })

app.get('/other', (req, res) => {
    console.log('Executing test')
    return res.status(200).send(
        '<h1>Testing another route</h1>'
    );
})



// Create server and listen to http requests
app.listen(port, () => {
    console.log('listening on port ' + port)
})