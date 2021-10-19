#! /usr/bin/python

import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="raspberrypi",
    password="piraspberry"
)

mycursor = mysql.cursor()

mycursor.execute("CREATE DATABASE test")

mydb = mysql.connector.connect(
    host="localhost",
    user="raspberrypi",
    password="piraspberry",
    database="test"
)

mycursor = mysql.cursor()

mycursor = mysql.cursor("CREATE TABLE values (id INT AUTO_INCREMENT PRIMARY KEY, time INT TIMESTAMP, value INT, team INT, test INT)")
mycursor = mysql.cursor("CREATE TABLE teams (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))")
mycursor = mysql.cursor("CREATE TABLE tests (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))")

for i in range(10):
    sql = "INSERT INTO teams (name) VALUES (%s)"
    val = ("Team"+i)
    mycursor.execute(sql, val)
    mydb.commit()

sql = "INSERT INTO tests (name) VALUES (%s)"
val = ("ultraschall")
mycursor.execute(sql, val)
mydb.commit()

sql = "INSERT INTO tests (name) VALUES (%s)"
val = ("temperature")
mycursor.execute(sql, val)
mydb.commit()