drop database if exists restaurant_db;
create database restaurant_db;
use restaurant_db;

create table restaurants ( 
	id int NOT NULL AUTO_INCREMENT,
    restaurant_name varchar(50),
    address varchar(50),
    zipcode varchar(20),
    city varchar(50),
    link varchar(255),
    restaurant_desc varchar(255),
    primary key (id)
);

insert into restaurants values (0, "OmNam", "Annankatu 29", 
"00100", "Helsinki", "http://omnam.fi/",
"Vegaanista ruokaa rakkaudella");
    
create table reviews(
	id int NOT NULL AUTO_INCREMENT,
    restaurant_id int,
    stars int,
    review varchar(255),
    primary key (id),
    foreign key (restaurant_id) references restaurants(id)
);

insert into reviews values(0, 1, 5, "Mahtavaa ruokaa");
insert into reviews values(1, 1, 2, "Aika pahaa lol");

create table opening_hours(
	id int NOT NULL AUTO_INCREMENT,
	restaurant_id int,
    monday varchar(25),
    tuesday varchar(25),
    wednesday varchar(25),
    thursday varchar(25),
    friday varchar(25),
    saturday varchar(25),
    sunday varchar(25),
	primary key (id),
    foreign key (restaurant_id) references restaurants(id)
);

insert into opening_hours values(0, 1, "11-15", "11-15",
 "11-15,17-22","11-15,17-22","11-15,17-22","12-22",null
);


