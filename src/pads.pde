/*
 * Ardrumo sketch
 *
 * Use with the Ardrumo software here:
 * http://code.google.com/p/ardrumo/
 */

int on[4], velocity[4];
unsigned long start[4];

void setup() {
  pinMode(LEDPIN, OUTPUT);
  Serial.begin(57600);   // set serial output rate
}

void loop() {
  for (int i=0; i<4; i++) {
    readInput(i);
  }
}

void readInput(int index) {
  int current = -1, val = analogRead(index);
  if (val < 70) {
    if (start[index] == 0) {
      start[index] = micros();
    }
    if (val < 40) {
      current = 1;
    }
  } else if (val > 70) {
    start[index] = 0;
    current = 0;
  }

  if (current != -1 && current != on[index]) {
    on[index] = current;
    if (on[index] == 1) {
      Serial.print(index);
      Serial.print(":");
      Serial.println(micros()-start[index]);
    } else {
      Serial.print(index);
      Serial.print(":");
      Serial.println(0);
      start[index] = 0;
      current = 0;
      on[index] = 0;
    }
  }

}