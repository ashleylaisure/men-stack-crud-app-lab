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
// ===== H. HOME =====
app.get('/', async (req, res) => {
    res.render('home.ejs')
});


// ===== I. INDEX =====
app.get('/music', async (req, res) => {
    const allMusic = await Music.find()
    res.render("music/index.ejs", { music : allMusic});
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
    res.redirect('/music/');
});
// ===== E. EDIT ======
// ===== S. SHOW ======
app.get("/music/:musicId", async (req, res) => {
    const foundMusic = await Music.findById(req.params.musicId);

    res.render("music/show.ejs", {music : foundMusic});
});



// =================================  PORT  ==========================
app.listen(port, () => {
    console.log('Listening on port:', port)
    // console.log(`Listening on port: ${port}`)
});