#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <elapsedMillis.h>

#define ONE_WIRE_BUS 2
#define RxD 0
#define TxD 1

SoftwareSerial ArdRasSerial (RxD, TxD);
OneWire oneWire(ONE_WIRE_BUS);  
DallasTemperature sensors(&oneWire);

void setup() {
 sensors.begin(); 
  ArdRasSerial.begin (9600);
  //Serial.begin (9600);
}

void loop() {
  sensors.requestTemperatures();
  Serial.println(sensors.getTempCByIndex(0));
  ArdRasSerial.println (sensors.getTempCByIndex(0));                                                       
  delay (200);
}



//Zusatz: Schaltung des TempSensors genau beachten!!
