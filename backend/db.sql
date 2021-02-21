create database blood_bank;
create database bloodbank;
use bloodbank;

use blood_bank;
create table donors(
donorId int not null auto_increment,
firstname varchar(20) not null,
secondname varchar(20) not null,
lastname varchar(20),
city varchar(30),
weight decimal,
pressure decimal,
gender ENUM('male', 'female'),
contact varchar(20) not null,
createdAt datetime default current_timestamp,
updatedAt datetime default current_timestamp,
primary key (donorId),
bloodtypeId int,
    INDEX bloodtypesIndex (bloodtypeId),
    FOREIGN KEY (bloodtypeId)
        REFERENCES bloodtypes(bloodtypeId)
        ON UPDATE CASCADE ON DELETE set null
);
create table donations (
  donationId INT NOT NULL auto_increment,
  donorId int,
  amount int,
  primary key(donationId),
  createdAt datetime default current_timestamp,
  updatedAt datetime default current_timestamp,
   INDEX donorIndex (donorId),
    FOREIGN KEY (donorId)
        REFERENCES donors(donorId)
        ON UPDATE CASCADE ON DELETE CASCADE,
	stockId int,
    INDEX bloodstockIndex (stockId),
    FOREIGN KEY (stockId)
        REFERENCES bloodstock(stockId)
        ON UPDATE CASCADE ON DELETE set null
);
alter table donors
drop column donations;

CREATE TABLE users (
  userId int AUTO_INCREMENT NOT NULL,
  username VARCHAR(30),
  email VARCHAR(30) UNIQUE NOT NULL,
  isAdmin boolean default false,
  password VARCHAR(200) NOT NULL,
  primary key (userId)
);
use blood_bank;
drop table users;

create table booking(
	bookingId int AUTO_INCREMENT NOT NULL,
    firstname varchar(20) not null,
	secondname varchar(20) not null,
	lastname varchar(20),
	city varchar(30),
	gender ENUM('male', 'female'),
	contact varchar(20) not null,
    appointment  datetime,
    primary key(bookingId),
    bloodtypeId int,
    INDEX bloodtypesIndex (bloodtypeId),
    FOREIGN KEY (bloodtypeId)
        REFERENCES bloodtypes(bloodtypeId)
        ON UPDATE CASCADE ON DELETE set null
);

drop table booking;
create table patients(
	patientId int AUTO_INCREMENT NOT NULL,
    patientname varchar(20) not null,
    amount int,
    primary key(patientId),
    stockId int,
    INDEX bloodstockIndex (stockId),
    FOREIGN KEY (stockId)
        REFERENCES bloodstock(stockId)
        ON UPDATE CASCADE ON DELETE set null
);

drop table bloodstock;
create table bloodstock (
	stockId int auto_increment not null,
    amount int,
	createdAt datetime default current_timestamp,
    bloodtypeId int,
    primary key(stockId),
    INDEX bloodtypesIndex (bloodtypeId),
    FOREIGN KEY (bloodtypeId)
        REFERENCES bloodtypes(bloodtypeId)
        ON UPDATE CASCADE ON DELETE set null
);



create table bloodtypes(
bloodtypeId int not null auto_increment,
bloodname varchar(5),
primary key (bloodtypeId)
);
