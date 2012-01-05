# tmpad

a DIY midi pad using infrared, arduino, and nodejs.

Hardware construction steps: http://tmpvar.com/project/tmpad

## Usage

    git clone git://github.com/tmpvar/tmpad.git
    cd tmpad
    npm install

### Program the arduino

using the arduino software (http://www.arduino.cc/en/Main/software) upload the `src/pads.pde`

### toMidi.js

Modify https://github.com/tmpvar/tmpad/blob/master/src/toMidi.js#L2 to point at the correct usb port.  You can find the port in the arduino application under the tools->Serial Port menu.

Now you are ready to go! run `node src/toMidi.js` and use a program that understands midi to play some sounds!

## Props

This project would not have been possible without the following nodejs libraries:

 * http://github.com/voodootikigod/node-serialport
 * http://github.com/justinlatimer/node-midi

## MIT License

see: https://github.com/tmpvar/tmpad/blob/master/LICENSE.txt

## Contact

me : http://twitter.com/tmpvar
my brother: http://twitter.com/R_H_2