const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UrlDataSchema = new Schema({
    ActualURL: {type: String, required: true},
    ShortenedURL: {type: String, required: false},
});


// Export the model
module.exports = mongoose.model('UrlData', UrlDataSchema);