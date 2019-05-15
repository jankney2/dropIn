create table users (

user_id serial primary key, 
first_name varchar(50) not null, 
last_name varchar(50) not null, 
user_email varchar(50) not null, 
user_phone bigint not null

);




create table property_lists ( 
	uploader_id int references users(user_id), 
	list_name varchar (50),
	list_id serial PRIMARY key

);


create table properties (

	parent_list_id int references property_lists(list_id), 
	property_id serial primary key,
	street varchar(150), 
	city varchar(50), 
	state varchar(50), 
	zip varchar(50), 
	price varchar(50), 
	bathrooms varchar(50),
	bedrooms varchar(50), 
	seller varchar(100)

)

insert into properties (
	parent_list_id, 
	street, 
	city, 
	state, 
	zip, 
	price, 
	bathrooms, 
	bedrooms, 
	seller
)

--this table has not been created in the db! find out shape of data. 
create table property_details(
	Columns:
	Owner_first_name, 
	Owner_last_name, 
	Street_address, 
	City, 
	ZipCode, 
	State, 
	List_id (foreign key that relates to user_lists table) 
	Uploader_id (foreign key that relates to users table) 

)
-- create table data_table(
-- 	List_id foreign key
-- 	Property_id foreign key. 
-- )


create table userLeads(

	lead_id serial primary key
	lead_first_name varchar(50) not null, 
	lead_last_name varchar(50) not null, 
	lead_phone bigint not null, 
	lead_email varchar(100) not null,
	submitting_user_id int references users(user_id)

)
