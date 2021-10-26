#! /usr/bin/python

import mysql.connector

#mydb = mysql.connector.connect(
#    host="localhost",
#    user="raspberrypi",
#    password="piraspberry"
#)

#mycursor = mydb.cursor()

#mycursor.execute("CREATE DATABASE test")

mydb = mysql.connector.connect(
    host="localhost",
    user="raspberrypi",
    password="piraspberry",
    database="test"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE valuet (id INT AUTO_INCREMENT PRIMARY KEY, value INT(255), team INT(255), test INT(255), time TIMESTAMP);")
mycursor.execute("CREATE TABLE teams (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));")
mycursor.execute("CREATE TABLE tests (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255));")

for i in range(8):
    sql = "INSERT INTO teams (name) VALUES (%s);"
    name = ("Team"+ str(i),)
    mycursor.execute(sql, name)
    mydb.commit()

sql = "INSERT INTO tests (name) VALUES (%s);"
val = ("ultraschall",)
mycursor.execute(sql, val)
mydb.commit()

sql = "INSERT INTO tests (name) VALUES (%s);"
val = ("temperature",)
mycursor.execute(sql, val)
mydb.commit()