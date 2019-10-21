const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SignUpSchema = new Schema({
    Email: {type: String, required: true},
    Password: {type: String, required: false},
    Status: {type: Number, required: false},
    UniqueID: {type: String, required: false},
});


// Export the model
module.exports = mongoose.model('SignUpData', SignUpSchema);