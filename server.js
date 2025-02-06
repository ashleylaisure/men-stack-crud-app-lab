// =================================  DEPENDENCIES  ==========================
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const methodOverride = require('method-override');
const morgan = require('morgan');

const path = require("path");

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

app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, "public")));

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
app.delete('/music/:musicId', async (req, res) => {
    await Music.findByIdAndDelete(req.params.musicId);
    res.redirect('/music/');
});

// ===== U. UPDATE ====
app.put("/music/:musicId", async (req, res) => {
    await Music.findByIdAndUpdate(req.params.musicId, req.body);
    
    res.redirect(`/music/${req.params.musicId}`);
})
// ===== C. CREATE ====
app.post('/music', async (req, res) => {
    await Music.create(req.body);

    console.log(req.body);
    res.redirect('/music/');
});
// ===== E. EDIT ======
app.get('/music/:musicId/edit', async (req, res) => {
    const foundMusic = await Music.findById(req.params.musicId);

    res.render("music/edit.ejs", {music : foundMusic});
});

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