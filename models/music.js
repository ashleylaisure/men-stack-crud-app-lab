const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    artist: String,
    song: String,
    genre: String,
    feeling: String,
});

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;