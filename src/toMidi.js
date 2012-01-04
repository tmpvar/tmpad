var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var parsers    = serialport.parsers;
var sp = new SerialPort('/dev/tty.usbmodemfd121', { baudrate: 57600 });
var midi = require('midi');
var output = new midi.output();
output.getPortCount();
output.getPortName(0);
output.openPort(0);

var buffer = "", on = [false, false, false, false];
var average = 0, heldTimer;
var note= 0;
sp.on('data',function(data) {
  buffer += data.toString()
  if (buffer.indexOf('\n') === -1) {
    return;
  }

  var parts = buffer.split('\n'), last = 40, changed = false;
  while (parts.length > 1) {
    var msg = parts.shift().split(':');
    var current = parseInt(msg[1], 10);
    var port = parseInt(msg[0], 10);

    buffer = parts.join('\n');
    last = current;

    if (current > 0 && on[port] !== true) {

      note++;
      if (note >= 127) {
        note = 0;
      }

      // TODO: calculate velocity based on the distance traveled
      //       total distance 3.17500mm

      var MAX = 105000;
      var vel = Math.round(((MAX-current)/MAX)*127);
      if (vel < 1) {
        vel = 1;
      } else if (vel > 127) {
        vel = 127;
      }

      on[port]=true;
      output.sendMessage([144, 40+port, vel]);
    } else if (current < 1 && on[port] === true) {
      output.sendMessage([128, 40+port, 1]);
      on[port] = false;
    }
  }
});
