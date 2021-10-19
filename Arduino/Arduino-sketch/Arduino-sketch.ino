#include <SoftwareSerial.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <elapsedMillis.h>

#define ONE_WIRE_BUS 4
#define RxD 0
#define TxD 1
#define PIN_TRIGGER 7
#define PIN_ECHO 9

const int SENSOR_MAX_RANGE = 300;
unsigned long duration;
unsigned int distance;
unsigned int distance2;

elapsedMillis temp;
elapsedMillis dist;
SoftwareSerial ArdRasSerial (RxD, TxD);
OneWire oneWire(ONE_WIRE_BUS);  
DallasTemperature sensors(&oneWire);

void setup()
{
  sensors.begin(); 
  ArdRasSerial.begin (9600);
  Serial.begin(9600);
  pinMode(PIN_TRIGGER, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  digitalWrite(PIN_TRIGGER, LOW);
  delayMicroseconds(2);

  digitalWrite(PIN_TRIGGER, HIGH);
  delayMicroseconds(10);

  duration = pulseIn(PIN_ECHO, HIGH);
  distance = duration/58;

  temp = 0;
  dist = 0;

}


void loop()
{
  if(dist >= 200){ 
    dist = 0;
    distance2 = distance;
    digitalWrite(PIN_TRIGGER, LOW);
    delayMicroseconds(2);

    digitalWrite(PIN_TRIGGER, HIGH);
    delayMicroseconds(10);

    duration = pulseIn(PIN_ECHO, HIGH);
    distance = duration/58;

    if (distance > SENSOR_MAX_RANGE || distance2 > SENSOR_MAX_RANGE || distance <= 0 || distance2 <= 0 || distance > distance2)
    {}else
    {
      Serial.println("Team1;u;" + String(distance2 - distance) + ",");
    }
    //delay(187);
  }

  if(temp >= 10000){
    temp = 0;
    sensors.requestTemperatures();
    Serial.println ("Team1;t;" + String(sensors.getTempCByIndex(0)) + ",");                                                       
    //delay (200);
  }
}
