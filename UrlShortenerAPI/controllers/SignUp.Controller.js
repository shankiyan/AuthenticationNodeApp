const SignUpData = require('../models/SignUp.model');
var nodemailer = require('nodemailer');


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

 exports.VerifyUserEmail = function (req, res) {   

    SignUpData.find({Email:req.body.Email}).then(data => {
        if(data.length>0)
        {
           
           res.send(data[0]);

        }
        else{
  
            let uniqueid= makeid(5)+ Math.random();
                var generated_hash=require('crypto');
                generated_hash=  generated_hash.createHash('sha256');
                generated_hash=generated_hash.update(uniqueid,'utf8');
                generated_hash=generated_hash.digest('hex');
                var encryptedurl=generated_hash.substring(0,7);
                let postData=new SignUpData(
                    {
                        Email:req.body.Email,
                        Password:req.body.Password,
                        UniqueID:encryptedurl,
                        Status:0
                    });
                    let link='https://shank3.herokuapp.com/app/activateEmail/'+encryptedurl+'';
                 SendEmail(link , req.body.Email);
                 
                    postData.save().then(data => {
                        res.send(data);
                         }).catch((err) => {
                             res.status(500).send({
                                 message: err.message || "No Record found"
                             });
         
                           }); 
     
                    res.status(404).send({
                        message: err.message || "Invalid Email ID"
                    });
                
                  
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });
}






function SendEmail(link , email)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sample@gmail.com',
          pass: '123456'
        }
      });
      
      var mailOptions = {
        from: 'shmediyosel@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        html: '<h1>Welcome</h1><p>One More Step</p> <a href='+link+'> CLICK HERE</a>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          
        } else {
       
        }
      });
}
 
 exports.ActivateAccount =  function  (req, res) {   
    const filter = { UniqueID: req.body.UniqueID  };
    const update = { Status:1};
 
    let promise = new Promise( async(resolve, reject) => {

        let doc = await SignUpData.findOneAndUpdate(filter, update, {
            new: true
          });
          res.send(doc);
    
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "No Record found"
                    });
                });
    return promise; 
}







