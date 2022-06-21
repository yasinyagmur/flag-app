//*=========================================================
//*                     FLAG-APP
//*=========================================================

//fetch to selected country datas
const fetchCountyy = async (name)=>{
  const url = `https://restcountries.com/v3.1/name/${name}`
  const res = await fetch(url);
  const data = await res.json();
  console.log(data[0])

}

fetchCountyy('turkey');
fetchCountyy('usa');
