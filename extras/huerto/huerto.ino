#include "DHT.h"

DHT dht;
DHT dht2;
int val=0;
int val2=0;

void setup()
{
  Serial.begin(9600);

  dht.setup(53);
  dht2.setup(52);
}

void loop()
{

  sensores();
  
}

void sensores(){
 
  val = analogRead(0);
  val2 = analogRead(1);

  Serial.print(dht.getHumidity(), 1);
  Serial.print(",");
  Serial.print(dht.getTemperature(), 1);
  Serial.print(",");
  Serial.println(val, 1);
  Serial.print(",");
  Serial.print(dht2.getHumidity(), 1);
  Serial.print(",");
  Serial.print(dht2.getTemperature(), 1);
  Serial.print(",");
  Serial.println(val2, 1);
  
  delay(5000);
  
}