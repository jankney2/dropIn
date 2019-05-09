update users 

set first_name=$1, 
 last_name=$2, 
 user_email=$3, 
  user_phone=$4

where user_id=$5

returning user_email, user_phone, first_name, last_name, user_id