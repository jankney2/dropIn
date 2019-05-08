insert into properties (
 	street, 
	city, 
	state, 
	zip, 
	price, 
	bathrooms, 
	bedrooms, 
	seller,
  property_list_id, 
  latitude, 
  longitude

) values (
  $1, 
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8, 
  (select list_id from property_lists where list_name=$9 limit 1), 
  $10, 
  $11
)
