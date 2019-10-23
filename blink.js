var onoff = require('onoff');
var Gpio = onoff.Gpio;
var rpin = new Gpio(0,'out');
var gpin = new Gpio(1,'out');

var interval = setInterval(function(){
    var rValue = (rpin.readSync() + 1) % 2;
    rpin.write(rValue,function(){
        console.log("Changed R to : " + rValue);
    });

    var gValue = (gpin.readSync() + 1) % 2;
    gpin.write(gValue,function(){
        console.log("Changed G to : " + gValue);
    });

},2000);

process.on('SIGINT',function(){
    clearInterval(interval);
    rpin.writeSync(0);
    rpin.unexport();

    gpin.writeSync(0);
    console.log("Bye,bye!");
    process.exit();
})