'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//AJAX calls

//

//const request = console.log(request);

const getCountry = function (ctry) {
  fetch(`https://restcountries.com/v3.1/name/${ctry}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      const [datas] = data;
      console.log(datas);

      const htl = `
        <article class="country">
        <img class="country__img" src="${datas.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${datas.name.common}</h3>
          <h4 class="country__region">${datas.region}</h4>
          <p class="country__row"><span>👫</span>${datas.population} people</p>
          <p class="country__row"><span>🛂</span>${datas.borders}</p>
          <p class="country__row"><span>🏛</span>${datas.capital}</p>
        </div>
      </article>`;
      countriesContainer.insertAdjacentHTML('beforeend', htl);
      countriesContainer.style.opacity = 1;

      //   const htl = `
      //   <article class="country">
      //   <img class="country__img" src="${datas.flags.png}" />
      //   <div class="country__data">
      //     <h3 class="country__name">${datas.name.common}</h3>
      //     <h4 class="country__region">${datas.region}</h4>
      //     <p class="country__row"><span>👫</span>${datas.population} people</p>
      //     <p class="country__row"><span>🗣️</span>${obj}</p>
      //     <p class="country__row"><span>💰</span>CUR</p>
      //   </div>
      // </article>`;
      console.log(datas.population);
      //console.log(Object.assign(datas.languages));

      console.log(datas.flags.png);
    });
};

getCountry('senegal');
