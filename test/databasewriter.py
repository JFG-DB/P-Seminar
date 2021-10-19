#! /usr/bin/python

import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="raspberrypi",
    password="piraspberry",
    database="test"
)

while True:
    bluetoothSerial = serial.Serial( "/dev/rfcomm0", baudrate=9600 )

    helpt = str(bluetoothSerial.readline().split(",")[0])
    helpz = str(helpt.split(";"))

    if helpz[0] == "Team1":
        if chr(helpz[1]) == 'u':
            val = (str())
        elif chr(helpz[1]) == 't':


mycursor = mysql.cursor()

sql = "INSERT INTO values ("
val = ("")
mycursor.execute(sql, val)
mydb.commit()