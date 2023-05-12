'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
// //AJAX calls using fetche() method and promises

// //

const renderCountry = function (data) {
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
};

// const getCountry = function (ctry) {
//   fetch(`https://restcountries.com/v3.1/name/${ctry}`)
//     .then(response => {
//       return response.json(), err => alert(err);
//     })
//     .then(data => {
//       renderCountry(data);
//       const [data1] = data;
//       const neigbor = data1.borders[0];
//       console.log(neigbor);
//       if (!neigbor) return;

//       return fetch(`https://restcountries.com/v3.1/name/${neigbor}`)
//         .then(response => response.json())
//         .then(data => {
//           renderCountry(data, 'neighbour');
//         });
//     });
// };

// getCountry('canada');

// looping over objec
// we can loop over an objec using Object.keys(object)  to get the key of the passed object
// we can also use Object.values(object) to ge the values  of the passed object

//exp

// const vaness = {
//   name: 'Babacar',
//   lastName: 'Diakite',
// };
// //
// // this will print Babacar Diakite
// for (const obj of Object.values(vaness)) {
//   console.log(obj);
// }
// //
// //this will print name lastName
// for (const obj of Object.keys(vaness)) {
//   console.log(obj);
// }

// const getCountry = function (ctry) {
//   fetch(`https://restcountries.com/v3.1/name/${ctry}`)
//     .then(response => {
//       response.json();
//     })
//     .then(data => {
//       console.log(data);
// // const [data1] = data;
// // console.log(data1);
// renderCountry(data);
// const [data1] = data;
// const neigbor = data1.borders[0];
// console.log(neigbor);
// if (!neigbor) return;

// return fetch(`https://restcountries.com/v3.1/name/${neigbor}`)
//   .then(response => response.json())
//   .then(data => {
//     renderCountry(data, 'neighbour');
//   });
//     });
// };
// getCountry('mali');

//: https://geocode.xyz/api. The AJAX call
//will be done to a URL with this format:

//const WhereAmI = function()

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);

//     const { latitude, longitude } = position.coords;
//     console.log(latitude, longitude);
//   },
//   function () {
//     alert(`Unable to get your current location`);
//   }
// );

// const whereAmI = function (lat, long) {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data.city);
//       console.log(data.country);
//       const country = data.country;
//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//           renderCountry(data);
//         })
//         .catch(err => alert(err.message));
//     });
// };
// whereAmI(52.508, 13.381);

//PromiseFy

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getLocation().then(data => {
//   console.log(data);
// });
// // some more promisefying
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const images = document.createElement('img');
//     images.setAttribute('src', `${imgPath}`);
//     if (images) {
//       resolve(images);
//     } else {
//       reject();
//     }
//     countriesContainer.prepend(images);

//     countriesContainer.style.opacity = 1;
//   });
// };

// // createImage('img/img-1.jpg')
// //   .then(() => {})
// //   .catch(err => {
// //     console.error(err);
// //   });

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     createImage('img/img-1.jpg')
//       .then(() => {})
//       .catch(err => {
//         console.error(err);
//       });
//     return wait(2);
//   })
//   .then(() => {});

//Async/Await async function will run in the background and when done it will return a promise that we can consum.
// An Async function can have one or more await statements. the await is always fallow by a promise.

//EXP;

const getnewLocation = async function () {
  try {
    const location = await getLocation();
    console.log(location);
    const { latitude: lat, longitude: long } = location.coords;
    console.log(lat, long);
    const latLong = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json`
    );
    const newLoc = await latLong.json();
    console.log(newLoc);
    const { country } = newLoc;
    console.log(country);
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const data = await response.json();
    renderCountry(data);
  } catch (err) {
    console.error(err);
  }
};
getnewLocation();
console.log('hello');

//Error Handling with try...catch.
// const whereAmI = function (lat, long) {
//   fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data.city);
//       console.log(data.country);
//       const country = data.country;
//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//           renderCountry(data);
//         })
//         .catch(err => alert(err.message));
//     });
// };
// whereAmI(52.508, 13.381);
