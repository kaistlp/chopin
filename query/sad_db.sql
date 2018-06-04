drop table if exists Trades;
drop table if exists Sells;
drop table if exists Demands;
drop table if exists Products;
drop table if exists Users;

Create table Users(
	id int not null auto_increment primary key,
	name varchar(15) not null,
 	email varchar(31) not null,
 	pw varchar(15) not null
);

create table Products(
	id int not null auto_increment primary key,
	name varchar(255) not null,
	max_price int,
	init_price int not null
);

create table Demands(
	uid integer REFERENCES Users(id) ON DELETE CASCADE,
	pid integer REFERENCES Products(id) ON DELETE CASCADE,
	offer_price int not null
);

create table Sells(
	uid int references Users (id) on delete cascade,
	pid int references Products (id) on delete cascade,
	initial_price int not null
);

create table Trades(
	seller_id int references Users (id) on delete cascade,
	buyer_id int references Users(id) on delete cascade,
	pid int references Products (id) on delete cascade,
	final_price int not null
);

insert into Users values(0, 'temp', 'qwe', 'asd');




