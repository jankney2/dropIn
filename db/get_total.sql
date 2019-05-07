select count(*) from properties p
join property_lists p_l
on p.property_list_id=p_l.list_id

where p_l.uploader_id=$1