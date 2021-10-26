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

    mycursor = mydb.cursor()

    if helpz[0] == "Team1":
        if chr(helpz[1]) == 'u':
            val = (str(helpz[2]), str(1), str(1))
        elif chr(helpz[1]) == 't':
            val = (str(helpz[2]), str(1), str(2))
        sql = "INSERT INTO valuet (value, team, test) VALUES (%i, %i, %i);"
        mycursor.execute(sql, val)



#sql = "INSERT INTO values ("
#val = ("")
#mycursor.execute(sql, val)
#mydb.commit()