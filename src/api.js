
const API = 'https://integracion-rick-morty-api.herokuapp.com/api/';

export const searchEpisode = (query, page) => {
  let searchEpisodesUrl;
  if (!query){ searchEpisodesUrl = API+`episode/?page=${page}`; }
  else { searchEpisodesUrl = API+`episode/?name=${query}&page=${page}`; }

  return(
    fetch(searchEpisodesUrl)
    .then(response => {
      if (response.status !== 200) { console.log(response.status); throw new Error("404"); }
      else { return response.json(); }
    })
  )
}

export const searchCharacter = (query, page) => {
  let searchCharactersUrl;
  if (!query){ searchCharactersUrl = API+`character/?page=${page}`; }
  else { searchCharactersUrl = API+`character/?name=${query}&page=${page}`; }
  return(
    fetch(searchCharactersUrl)
    .then(response => {
      if (response.status !== 200) { console.log(response.status); throw new Error("404"); }
      else { return response.json(); }
    })
  )
}

export const searchLocation = (query, page) => {
  let searchLocationsUrl;
  if (!query){ searchLocationsUrl = API+`location/?page=${page}`; }
  else { searchLocationsUrl = API+`location/?name=${query}&page=${page}`; }
  return(
    fetch(searchLocationsUrl)
    .then(response => {
      if (response.status !== 200) { console.log(response.status); throw new Error("404"); }
      else { return response.json(); }
    })
  )
}

export const getCharacters = (charactersUrls) => {
  var searchUrl = API+`character/${charactersUrls.map((x) => x.split("/").pop()).join(",")}`;
  console.log("GET " + searchUrl);
  return(
    fetch(searchUrl)
    .then(response => response.json())
  )
}

export const getEpisodes = (episodesUrls) => {
  var searchUrl = API+`episode/${episodesUrls.map((x) => x.split("/").pop()).join(",")}`;
  console.log("GET " + searchUrl);
  return(
    fetch(searchUrl)
    .then(response => response.json())
  )
}

export const getLocations = (locationUrls) => {
  var searchUrl = API+`location/${locationUrls.map((x) => x.split("/").pop()).join(",")}`;
  console.log("GET " + searchUrl);
  return(
    fetch(searchUrl)
    .then(response => response.json())
  )
}
