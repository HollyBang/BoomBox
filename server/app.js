const express = require('express');
const morgan = require('morgan');
const path = require('path');
var SpotifyWebApi = require('spotify-web-api-node');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// const spotifyApi = new SpotifyWebApi({
//   clientId: '53061605254f4d0dabc30b955189a78a',
//   clientSecret: '77b866a65fda4f60bb7347b4fe9d4710',
//   redirectUri: 'http://localhost:9000',
// });

// // Set an access token.
// // This is required as Spotify implemented a new auth flow since May 2017.
// // See https://developer.spotify.com/news-stories/2017/01/27/removing-unauthenticated-calls-to-the-web-api/
// spotifyApi.clientCredentialsGrant()
//   .then(function (data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);

//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function (err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });

module.exports = app;