drop table if exists Trades;
drop table if exists Descriptions;
drop table if exists Demands;
drop table if exists Products;
drop table if exists Users;

Create table Users(
	id int not null auto_increment primary key,
	uname varchar(15) not null,
 	pw varchar(15) not null,
 	phone_num varchar(14) not null,
 	reg_time varchar(14)
);

create table Products(
	pid int not null auto_increment primary key,
	uid int not null,
	pname varchar(255) not null,
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
	foreign key (pid) references Products(pid) on delete cascade,
	primary key (uid, pid)
);

create table Trades(
	seller_id int not null,
	buyer_id int not null,
	pid int not null,
	final_price int not null,
	foreign key (seller_id) references Users(id) on delete cascade,
	foreign key (buyer_id) references Users(id) on delete cascade,
	foreign key (pid) references Products(pid) on delete cascade,
	primary key (seller_id, buyer_id, pid)
);

create table Descriptions(
	pid int not null,
	name varchar(14) not null,
	value varchar(255) not null,
	foreign key (pid) references Products(pid) on delete cascade,
	primary key (pid, name)
);

insert into Users (uname, pw, phone_num) values('qwe', 'asd', '012-3456-7890');
insert into Users (uname, pw, phone_num) values('kim', 'jae', '010-3090-3502');
insert into Users (uname, pw, phone_num) values('lee', 'lee', '010-2222-2222');

insert into Products (uid, pname, max_price, init_price, is_sold, reg_time)
	values(1, 'car', null, 1000, 'N', '20120727150017');
insert into Products (uid, pname, max_price, init_price, is_sold, reg_time)
	values(1, 'book', null, 1, 'N', '20120727150018'),
	(1, 'cpu', null, 200, 'N', '20120727150019'),
	(2, 'bike', null, 30000, 'N', '20120727150020'),
	(2, 'glass', 200, 100, 'N', '20170727150018'),
	(3, 'Gold', 200, 100, 'Y', '20170727150018');

insert into Descriptions values (1, 'description', 'Old car just like a new car!!!');
insert into Descriptions values (2, 'description', 'So clean!!');
insert into Descriptions values (3, 'description', 'BitCoin!!!!!!!!');
insert into Descriptions values (4, 'description', 'Whing Whing SSang SSang');
insert into Descriptions values (5, 'description', '');
insert into Descriptions values (6, 'description', 'Very Expensive');
insert into Descriptions values (1, 'Period of Use', '10 Years');
insert into Descriptions values (1, 'Country', 'Korea');	


insert into Demands values(3, 1, 2000, null);
insert into Demands values(2, 1, 3000, null);

insert into Demands values(2, 2, 3, null);
insert into Demands values(3, 2, 2, null);
insert into Demands values(1, 4, 300, null);

insert into Trades values(3, 1, 6, 200);


