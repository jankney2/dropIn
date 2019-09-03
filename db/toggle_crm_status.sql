update properties 
set send_to_crm=$1
where property_id=$2




returning (select * from properties p
join property_lists p_l
on p.property_list_id=p_l.list_id

where p_l.uploader_id=$3

-- and is_tracked='t'

 order by p.property_id asc
--  limit 20)
)