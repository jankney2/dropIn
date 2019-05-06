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