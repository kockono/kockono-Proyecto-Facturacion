const helpers ={}; //Objeto

helpers.randomPin = () => {
    
    let pin = Math.floor(Math.random(1000, 9999)*10000);

    return pin;
};

module.exports = helpers;