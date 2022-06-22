//*=========================================================
//*                     FLAG-APP
//*=========================================================

//fetch to selected country datas
const fetchCountyy = async (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      renderError(`Something went wrong:${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    // console.log(data[0]);
    renderCountry(data[0]);
  } catch (error) {
    console.log(error);
  }
};
const selectDiv = document.querySelector(".form-select");
const getAllCountries = async () => {
  const url = `https://restcountries.com/v3.1/all`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      renderError(`Something went wrong:${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    let countryArr = [];
    data.forEach((e) => {
      const { common } = e.name;
      countryArr.push(common);
    });
    countryArr.sort().forEach((country) => {
      selectDiv.innerHTML += `<option>${country}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
};

let countriesDiv = document.querySelector(".countries");
let selectedCountryArr = [];
const add = document.getElementById("add");

add.addEventListener("click", () => {
  if(selectDiv.value && !selectedCountryArr.includes(selectDiv.value)){selectedCountryArr.push(selectDiv.value);
  fetchCountyy(selectDiv.value);
  }
  selectDiv.value = ``;

});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  location.reload()
});

const renderError = (err) => {
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = `<figure class="figure">
  <img src="./image/404.png" class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">${err}</figcaption>
</figure>
    `;
};
const renderCountry = (country) => {
  // console.log(country);
  const countriesDiv = document.querySelector(".countries");
  const {
    capital,
    name: { common },
    region,
    flags: { svg },
    languages,
    currencies,
    population,
  } = country;
  countriesDiv.innerHTML += `
  <div class="card shadow-lg align-items-center" id='cardDiv' style="width: 18rem;">
    <img src="${svg}" class="card-img-top " alt="...">
    <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p class="card-text">${region}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i>  ${capital}</li>
      <li class="list-group-item"><i class="fas fa-lg fa-comments"></i>  ${
        Object.values(languages)[0]
      }</li>
      <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave"></i>  ${
        Object.values(currencies)[0].name
      }, ${Object.values(currencies)[0].symbol}</li>
      <li class="list-group-item"> <i class="fa fa-users" aria-hidden="true"></i>  ${population}</li>
    </ul>  
  </div>
  `;
};

getAllCountries();