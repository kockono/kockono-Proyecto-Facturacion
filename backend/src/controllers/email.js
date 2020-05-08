const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
// const { randomPin } = require("../helpers/pin");

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
  
function randomPin(){
    
  let pin = Math.floor(Math.random(1000, 9999)*10000);

  return pin;
};



router.post('/correo', async(req, res) => {
  let pin = randomPin();
      
    // let {correo} = await req.body;
    // let { pinUsuario} = await req.body;
    // await console.log(pinUsuario);
    // await console.log(correo);
    //   let mailOptions = {
    //       from: 'sidddarta@gmail.com',
    //       to: `${correo}`,
    //       subject: 'Nodemailer test',
    //       text: `<h1> Recuperacion De Contraseña</h1>
    //       <h2>El Pin expirara en 1 hora</h2>
          // Para restablecer su contraseña, ingrese el siguiente código de verificación cuando se le indique:${pin}
    //       `
    //   }
    //   transporter.sendMail(mailOptions, function (err, res) {
      
    //       if(err){
    //           console.log("no se logro");
    //       } else {
    //           console.log('Email Enviado');
    //       }
    //   })

    
    
  });


  router.post('/pin', async(req, res) => {
    const { pinUsuario } = req.body;
    console.log(pinUsuario);
      if(pin === pinUsuario) {

      }else{

      }


  });
  


module.exports = router;



// console.log("Funciono!" + pinUsuario);
// let pin;
// pin = setInterval(hola, 2000);
// console.log(pin);
//  pin = setInterval((callback) => { 
//   let pin = randomPin();
//   console.log(pin);
//   callback(pin);

// }, 15000);

// setTimeout(function() { 
//   pin = null; 
// }, 15000); //Milisegundos 3600000 1 hora