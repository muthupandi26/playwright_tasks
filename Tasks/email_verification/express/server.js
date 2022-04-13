const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/contactForm.html');
})

app.post('/', (req,res) => {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'muthupandi261999@gmail.com',
            pass : 'pandi261999'
        }
    })

    const serverId = 'uvgsnjwv';
    const serverDomain = 'uvgsnjwv.mailosaur.net';

    const mailOptions = {
        from : req.body.email,
        // to : 'hey@uvgsnjwv.mailosaur.net',
        // to : `muthu@${serverDomain}`,
        to : 'muthuapi2699@gmail.com',
        subject :  req.body.subject,
        text :  `Message from ${req.body.email} \n ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log("Email sent " + info.response);
            res.send('success');
        }

    })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})