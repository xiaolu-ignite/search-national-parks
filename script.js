'use strict'

const apiKey = '74ICu5ganTnUMHQcTKTGzmLPOegD1Bo86AhMBJcz'; 

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  $('#results-list').empty();
  
  for (let i = 0; i < responseJson.data.length; i++){
    let name = (i+1) + ". " + responseJson.data[i].fullName;
    $('#results-list').append(
      `<li><h3>${name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParksList(query, limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParksList(searchTerm, maxResults);
  });
}

$(watchForm);