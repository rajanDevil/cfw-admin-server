
export const getMarkers = input => {
  console.log(input.value);
  if (typeof input.value === 'string' || input.value instanceof String){
    // it's a string
    if(input.value.length > 10){
    console.log(input.value);
    return JSON.parse(input.value);
    }else{
      console.log("nnonon");
      return input.value;}
   } else{
    // it's something else
    return input.value; 
   }
}

export const getPosition = e => ({
  lng: e.latLng.lng(),
  lat: e.latLng.lat(),
});
