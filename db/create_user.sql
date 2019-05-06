insert into users (
  first_name, 
  last_name, 
  user_email, 
  user_phone, 
  pass_hash
) values (
  $1, 
  $2, 
  $3, 
  $4, 
  $5
) returning user_email, user_phone, first_name, last_name, user_id;