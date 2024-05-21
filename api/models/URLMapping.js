const mongoose = require('mongoose');

const URLMappingSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

URLMappingSchema.index({url: 1}, {unique: true});
URLMappingSchema.index({shortUrl: 1}, {unique: true});

module.exports = mongoose.model('URLMapping', URLMappingSchema);