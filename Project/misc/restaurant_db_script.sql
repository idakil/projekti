drop database if exists restaurant_db;
create database restaurant_db;
use restaurant_db;

create table restaurants ( 
	id int NOT NULL AUTO_INCREMENT,
    restaurant_name varchar(50),
    restaurant_address varchar(50),
    zipcode varchar(20),
    city varchar(50),
    link varchar(255),
    restaurant_desc varchar(255),
    rating float,
    monday varchar(25),
    tuesday varchar(25),
    wednesday varchar(25),
    thursday varchar(25),
    friday varchar(25),
    saturday varchar(25),
    sunday varchar(25),
    primary key (id)
);

insert into restaurants values (0, "OmNam", "Annankatu 29", 
"00100", "Helsinki", "http://omnam.fi/",
"Vegaanista ruokaa rakkaudella", null, "1100-1500", "1100-1500",
 "1100-1500,1700-2200","1100-1500,1700-2200","1100-1500,1700-2200","1200-2200", null);

insert into restaurants values (0, "Soi Soi", "Vaasankatu 9", 
"00500", "Helsinki", "http://soisoi.fi/",
"Herkullista kasvisruokaa pikaisesti", null, "1100-2300", "1100-2300", "1100-2300",
 "1100-2300","11-2300","1100-2300","1300-2100");

 insert into restaurants values (0, "Roots", "Eurantie 8", 
"00550", "Helsinki", "http://rootshki.fi/",
"Nothing tastes as good as vegan feels", null, "0800-1830", "1100-2300", "1100-2300",
 "1100-2300","1100-2300","1100-2300","1300-2100");

 insert into restaurants values (0, "Levant", "Bulevardi 15", 
"00120", "Helsinki", "http://levant.fi/",
"Maistuvaa, helppoa ja edullista kasvisruokaa iloisella palvelulla"
, null, "1100-2000", "1100-2000", "1100-2000",
 "1100-2000","1100-2100","1100-2100",null);

insert into restaurants values (0, "Bun2Bun", "Urho Kekkosen katu 1",
"00100", "Helsinki", "http://bun2bunburgers.com/",
"Burgeri mut parempi", null, "1000-2100", "1000-2100", "1000-2100", "1000-2100", "1000-2100", "1000-2200", "1200-1900");

insert into restaurants values (0, "Bun2Bun", "Hermannin rantatie 5",
"00580", "Helsinki", "http://bun2bunburgers.com/",
"Burgeri mut parempi", null, "1030-2100", "1030-2100", "1030-2100", "1030-2100", "1030-2100", "1030-1900", "1200-1800");

insert into restaurants values (0, "Kippo", "Mannerheimintie 14",
"00100", "Helsinki", "http://kippohelsinki.com/",
"Plants are good", null, "0800-2000", "0800-2000", "0800-2000", "0800-2000", "0800-2000", "1100-1900", "1200-1800");

create table reviews(
	id int NOT NULL AUTO_INCREMENT,
    restaurant_id int,
    stars int,
    review varchar(255),
    userName varchar(25),
    primary key (id),
    foreign key (restaurant_id) references restaurants(id)
);

insert into reviews values(null, 1, 5, "Mahtavaa ruokaa","Mirjami");
insert into reviews values(null, 1, 2, "Aika pahaa lol","Karen-Ann");


