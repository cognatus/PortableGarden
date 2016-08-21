
int myPins[] = {49,48,47,46,45,44};
int bomba = 48;
int ventiladora = 47;
int ventiladorb = 46;
int focosa = 45;
int focosb = 49;
char chido = ' ';
int piso = 0;
int condicion = 0;
int cortina = 123;
boolean stringComplete = false;

void setup()
{
  Serial.begin(5000);

   for(int i=0; i < 6; i++){
      
    pinMode(myPins[i], OUTPUT);

  }

}

void loop()
{
  furular();
}

void furular() {

  if (stringComplete) {
    switch (chido) {
      case 'b':
        //aqui des/activamos la bomba y abrimos/cerramos el servo
        digitalWrite((bomba), condicion);
        break;

      case 'v':
        //solo manda señal así
        if(piso == 1){
          digitalWrite((ventiladora), condicion);
        }else{
          digitalWrite((ventiladorb), condicion);
        }
        break;

      case 'l':
        //solo señal 
        if(piso == 1){
          digitalWrite((focosa), condicion);
        }else{
          digitalWrite((focosb), condicion);
        }
        break;

      case 'c':
        //codigo de los motores dependiendo de lo que mande en condicion
        digitalWrite((cortina), condicion);
        break;
      case 'd':
        //aqui des/activamos la bomba y abrimos/cerramos el servo
        digitalWrite((bomba), condicion);
        break;
    }
  }
}

 void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();

    if (inChar == '\r') {
      stringComplete = true;
    }
    if (inChar == '1') {
      piso = 1;
    }
    if (inChar == '2') {
      piso = 0;
    }
    if (inChar == 'f') {
      condicion = 0;
    }
    if (inChar == 't') {
      condicion = 1;
    }
    switch (inChar) {
      case 'b':
        chido = 'b';
        break;
      case 'v':
        chido = 'v';
        break;

      case 'l':
        chido = 'l';
        break;

      case 'c':
        chido = 'c';
        break;
      case 'd':
        chido = 'd';
        condicion = 0;
        break;
    }
  }
}
