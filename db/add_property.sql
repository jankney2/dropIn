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
  longitude, 
  is_tracked 
  

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
  $11, 
  $12
)





--     properties.forEach(async (el) => {
--     //geocode the address

--  axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${el["Property Street"]}+${el["Property City"].replace(',','')}+${el['Property State']}+${el['Property Zip'].toString()}&key=${REACT_APP_GOOGLE_MAPS_KEY}`)
--     .then(geoCodeRes=>{
      
      
--       console.log(geoCodeRes.data.results[0].geometry.location)
--       let latitude= geoCodeRes.data.results[0].geometry.location.lat.toString()

--       let longitude=geoCodeRes.data.results[0].geometry.location.lng.toString()


      
      
      
--       //add lat and long into db with all other components 
      
--       dbInstance.add_property([el["Property Street"],
--       el['Property City'],
--       el['Property State'],
--       el['Property Zip'].toString(),
--       el.Price.toString(),
--       el['Bathrooms Full'].toString(), el.Bedrooms.toString(),
--       el.Seller, listName, latitude, longitude])
--       .catch(err=>{
--         res.send(err, "database error")
--         console.log(err)}) 
        
--       })
      
--     })