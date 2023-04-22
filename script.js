
// Where do we want to put the articles
let content = document.getElementsByTagName('content')[0];

// Create the function to fetch and display the RSS feed
function fetchAndDisplayRSS(url) {
  // Set up our HTTP request
  let xhr = new XMLHttpRequest();

  // Setup our listener to process completed (asynchronous) requests
  xhr.onload = function () {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.responseText);
      displayRSS(data);
    } else {
      // What to do when the request fails
      console.log('The request failed!');
    }
  };

  // Create and send a GET request
  xhr.open('GET', `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
  xhr.send();
}

// Create the function to display the RSS feed
function displayRSS(data) {
  content.innerHTML = '';

  if (data.status === 'ok') {
    for (let article of data.items) {
      let articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h3><a href="${article.link}">${article.title}</a></h3>
        <p>${article.description}</p>
        <small>${article.pubDate}</small>
      `;
      content.appendChild(articleElement);
    }
  } else {
    content.innerHTML = '<p>Unable to fetch the RSS feed.</p>';
  }
}

// Get the elements
let rssInput = document.getElementById('rss-input');
let addFeedButton = document.getElementById('add-feed');

// Add event listener for the button
addFeedButton.addEventListener('click', function () {
  fetchAndDisplayRSS(rssInput.value);
});
