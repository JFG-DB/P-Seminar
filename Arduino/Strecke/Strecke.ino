#define PIN_TRIGGER 7
#define PIN_ECHO 6

const int SENSOR_MAX_RANGE = 300;
unsigned long duration;
unsigned int distance;
unsigned int distance2;

void setup()
{
  Serial.begin(9600);
  pinMode(PIN_TRIGGER, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  digitalWrite(PIN_TRIGGER, LOW);
  delayMicroseconds(2);

  digitalWrite(PIN_TRIGGER, HIGH);
  delayMicroseconds(10);

  duration = pulseIn(PIN_ECHO, HIGH);
  distance = duration/58;
}

void loop()
{  
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
    Serial.println(String(distance2 - distance) + ",");
  }
  delay(187);
}
