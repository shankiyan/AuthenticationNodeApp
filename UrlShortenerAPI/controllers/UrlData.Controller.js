const UrlData = require('../models/UrlData.model');


exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.InsertURL = function (req, res) {
    let postData = new UrlData(
        {
            ActualURL: req.body.ActualURL,
            ShortenedURL: req.body.ShortenedURL
        }
    );    

    postData.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });

    }


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 exports.GetOriginalURL = function (req, res) {   
    UrlData.find({ShortenedURL:req.body.url}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });
}
 
exports.ShortenURL = function (req, res) {   
    const query = { ActualURL: req.body.ActualURL };

    let promise = new Promise((resolve, reject) => {
        UrlData.findOne(query, (err, url) => {
            if (err) {
                reject(err);
            } else {
                if (url){
                   
                    res.send(url);

                }
                else{
                let uniqueid= makeid(5)+ Math.random();
                var generated_hash=require('crypto');
                generated_hash=  generated_hash.createHash('sha256');
                generated_hash=generated_hash.update(uniqueid,'utf8');
                generated_hash=generated_hash.digest('hex');
                var encryptedurl=generated_hash.substring(0,7);
                let postData=new UrlData(
                    {
                        ActualURL:req.body.ActualURL,
                        ShortenedURL:'https://shank3.herokuapp.com/app/red/'+encryptedurl+''
                    });

                   postData.save().then(data => {
                   res.send(data);
                    }).catch((err) => {
                        res.status(500).send({
                            message: err.message || "No Record found"
                        });
    
                      });
                    }
            }
        })
    })
    return promise; 
}







