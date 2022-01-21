export const getShowsByKey = key => {
 return fetch(`http://www.tvmaze.com/api/search/shows?q=${key}`)
 .then(resp => console.log(resp.json()))
 .then(data=> console.log(data))
}

export const getShowById = id => {
 return fetch(`http://www.tvmaze.com/api/shows/${id}?embed=cast`)
 .then(resp => console.log(resp.json()))
 .then(data=> console.log(data))
}


getShowsByKey('girls')