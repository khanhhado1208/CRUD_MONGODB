const mongoose = require('mongoose');
const car = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: String, required: true }
})

module.exports = mongoose.model('cars', car);
