// =================================  DEPENDENCIES  ==========================
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

// =================================  MIDDLEWARE  ==========================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name} database.`)
})

const Music = require("./models/music.js");

app.use(express.urlencoded({ extended: false }));

// =================================  INDUCES ROUTES  ==========================
// ===== I. INDEX =====
app.get('/', async (req, res) => {
    res.render('index.ejs')
});

// ===== N. NEW =======
app.get('/music/new', (req, res) => {
    res.render('music/new.ejs');
});

// ===== D. DELETE ====
// ===== U. UPDATE ====
// ===== C. CREATE ====
app.post('/music', async (req, res) => {
    await Music.create(req.body);

    console.log(req.body);
    res.redirect('/music/new');
});
// ===== E. EDIT ======
// ===== S. SHOW ======




// =================================  PORT  ==========================
app.listen(port, () => {
    console.log('Listening on port:', port)
    // console.log(`Listening on port: ${port}`)
});