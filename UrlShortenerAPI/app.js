// app.js
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
// initialize our express app
const UrlData = require('./routes/UrlData.route');


const app = express();

const mongoose = require('mongoose');
let dev_db_url = "mongodb+srv://shankiyan:shankiyan@cluster0-6uyvw.mongodb.net/urlshortner";
const mongoDB =  dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true  ,  useUnifiedTopology: true})
.then(() => {
    console.log('Successfully connected to the database: ' + mongoDB);
}).catch(err => {
    console.log('Could not connect to the database. ' + err);
});



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/app', UrlData);
app.get('/', function(req, res){
   res.send('Welcome');
 });

let port = process.env.PORT  || 5000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});


