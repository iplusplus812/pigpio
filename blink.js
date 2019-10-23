var onoff = require('onoff');
var Gpio = onoff.Gpio;
var rpin = new Gpio(0,'out');
var gpin = new Gpio(1,'out');

var interval = setInterval(() => {
    var rValue = rpin.readSync() > 0 ? 0: 255;
    rpin.write(rValue,() => {
        console.log("Changed R to : " + rValue);
    });

    var gValue = gpin.readSync() > 0 ? 0: 255;
    gpin.write(gValue,() => {
        console.log("Changed G to : " + gValue);
    });

},2000);

process.on('SIGINT',() => {
    clearInterval(interval);
    rpin.writeSync(0);
    rpin.unexport();

    gpin.writeSync(0);
    gpin.unexport();
    console.log("Bye,bye!");
    process.exit();
});