const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function getFilmTitles(films) {
 return films
 .sort((a, b) => a.episode_id - b.episode_id)
 .map(film => `${film.episode_id}. ${film.title}`)
 .join("\n")
}
//using promise for films

// fetch(API_URL + "films")
//   .then(response => {
//     if (!response.ok) {
//       // return Promise.reject(new Error("Unsuccessfull response"));
//       throw new Error("Unsuccessfull response");
//     }
//     return response.json().then(films => {
//       output.innerText = getFilmTitles(films);
//       return films;
//     })
//   })
//   .catch(error => {
//     console.warn(error);
//     output.innerText = 'fail';
//     return [];
//   })
//   .finally(() =>{
//     spinner.remove();
//   })
//   .then(films => {
//     console.log(films)
//   })

//using promise all
function queryAPI(endpoint) {
  return fetch(API_URL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
}

Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
  queryAPI("species")
])
  .then(([films, planets, species]) => {
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species \n\n` +
      getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = "fail";
  })
  .finally(() => {
    spinner.remove();
  });
