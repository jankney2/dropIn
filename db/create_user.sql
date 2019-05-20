insert into users (
  first_name, 
  last_name, 
  user_email, 
  user_phone, 
  pass_hash, 
  account_level, 
  allowable_tracking_num
) values (
  $1, 
  $2, 
  $3, 
  $4, 
  $5, 
  $6, 
  $7
) returning user_email, user_phone, first_name, last_name, user_id;