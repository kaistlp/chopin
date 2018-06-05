drop table if exists Trades;
drop table if exists Descriptions;
drop table if exists Demands;
drop table if exists Products;
drop table if exists Users;

Create table Users(
	id int not null auto_increment primary key,
	name varchar(15) not null,
 	pw varchar(15) not null,
 	phone_num varchar(14) not null,
 	reg_time varchar(14)
);

create table Products(
	pid int not null auto_increment primary key,
	uid int not null,
	name varchar(255) not null,
	max_price int,
	init_price int not null,
	is_sold char(1),
	reg_time varchar(14),
	foreign key (uid) references Users(id) on delete cascade
);

create table Demands(
	uid integer not null,
	pid integer not null,
	offer_price int not null,
	reg_time varchar(14),
	foreign key (uid) references Users(id) on delete cascade,
	foreign key (pid) references Products(pid) on delete cascade
);

create table Trades(
	seller_id int not null,
	buyer_id int not null,
	pid int not null,
	final_price int not null,
	foreign key (seller_id) references Users(id) on delete cascade,
	foreign key (buyer_id) references Users(id) on delete cascade,
	foreign key (pid) references Products(pid) on delete cascade
);

create table Descriptions(
	pid int not null,
	name varchar(14) not null,
	value varchar(255) not null,
	foreign key (pid) references Products(pid) on delete cascade
);

insert into Users (name, pw, phone_num) values('qwe', 'asd', '012-3456-7890');
insert into Users (name, pw, phone_num) values('kim', 'jae', '010-3090-3502');
insert into Users (name, pw, phone_num) values('lee', 'lee', '010-2222-2222');

insert into Products values(0, 1, 'car', null, 1000, 'N', '20120727150017');
insert into Products (uid, name, max_price, init_price, is_sold, reg_time)
	values(1, 'book', null, 1, 'N', '20120727150018'),
	(1, 'cpu', null, 200, 'N', '20120727150019'),
	(2, 'bike', null, 30000, 'N', '20120727150020'),
	(2, 'glass', 200, 100, 'N', '20170727150018');






