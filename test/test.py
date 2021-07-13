#! /usr/bin/python

import serial
import json
import csv
#import bluetooth
from time import sleep

while True:

    f = open("/var/www/P-Seminar-clone/test/test.txt", "r")
    if f.read() == "yes" :

        bluetoothSerial = serial.Serial( "/dev/rfcomm0", baudrate=9600 )
        #devices = bluetooth.discover_devices(lookup_names = True, lookup_class = True)

        data = {}
        ultra = {}
        spann = {}
        temp = {}
        i = True
        j = 0
        b = 0

#        for addr in devices:
#            if addr == "98:D3:31:F5:C6:E0":
#                i = True
#            else:
#                i = False
        while i:
        #for b in range(10):
            
            helpt = int(bluetoothSerial.readline().split(",")[0])
            if helpt > 2:
                ultra["Wert" + str(b)] = str(helpt)
                b = b + 1
            elif helpt < 3:
                ultra["Wert" + str(b)] = str(helpt)
                b = b + 1
                if j > 20:
                    i = False

            j = j + 1
#            helpOans = help.split(",")

#            if (help < 1 or  help > -1) and j < 4:
#               j = j + 1
#            elif (help < 1 or help > -1) and j > 4:
#                i = False
#            else:
#                ultra["Wert" + str(j)] = help
#                j = j + 1

            



        #    if help[0] == "u":
        #         ultra["Wert" + str(i/2)] = helpOans[1]
        #    elif help[0] == "s":
        #         spann["Wert" + str(i/2)] = helpOans[1]
        #    elif bluetootSerial.readline() == "t":
        #        helpt = bluetootSerial.readline().split(",")
        #        temp["Wert" + str(i)] = helpt[0]
        data["ultraschall"] = ultra
        data["spannung"] = spann
        data["temperatur"] = temp
        with open('/var/www/P-Seminar-clone/JS/data.json', 'w') as outfile:
            json.dump(data, outfile)
        with open('/var/www/P-Seminar-clone/data.csv', 'W') as f:
            for key in data.keys():
                f.write("%s\n"%(data[key]))
        f = f = open("/var/www/P-Seminar-clone/test/test.txt", "w")
        f.write("no")
        print("fertig")
    f.close()
    sleep(1)