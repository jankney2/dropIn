

update properties
set property_list_id=0
where property_list_id=$1;


delete from property_lists
where list_id=$1;
