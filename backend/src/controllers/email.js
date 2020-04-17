const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'sidddarta@gmail.com',
      clientId: '481779830136-hk5b69oj18ivp3fu0c9b9edop7ncgi80.apps.googleusercontent.com',
      clientSecret: 'KfRcWBamO2mdusRNPwTvInCb',
      refreshToken: '1//04og3h2UzTZXRCgYIARAAGAQSNwF-L9IrOo0MPlmqh9ffgJH2YRyFYxkcDz9T-9-r2LRjpLmpBqwzQS9be4TMjegFJloPH_Mn5HQ',
      accessToken: 'ya29.a0Ae4lvC34dSXm6AvkdpauPVTWuLz6PIc6m0oUja53bcT5bzD1LrWiQUPawOGleLzNn9NGNC6w6mnXHxsig04DClDcItUBsSNXLcc4VMCZzb9hzJK-EW0al2iA61RSeXjSoS0RpwmcvYpwAtqo6CKP0v71FSP_TMfTAus',
    },
  });

let pin = Math.floor(Math.random(1000, 9999)*10000);

let mailOptions = {
    from: 'sidddarta@gmail.com',
    to: 'ozdroidz@gmail.com',
    subject: 'Nodemailer test',
    text: `Tu pin es: ${pin}`
}

transporter.sendMail(mailOptions, function (err, res) {

    if(err){
        console.log("no se logro");
    } else {
        console.log('Email Enviado');
    }
})