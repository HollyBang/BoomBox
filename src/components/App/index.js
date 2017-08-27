import React, { Component } from 'react';
import './../style.css';
import Profile from './../Profile';
import Gallery from './../Gallery';
import equalizerBoomBox from './../../img/BoomBox.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      accToken: null,
      tracks: []
    }
  }
  componentDidMount() {
    let hashParams = {};
    let e;
    let r = /([^&;=]+)=?([^&;]*)/g;
    let q = this.props.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    this.setState({
      accToken: hashParams.access_token
    });

  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let accessToken = this.state.accToken;
    
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, fetchOptions)
      .then(response => response.json())
      .then(json => {
        const total = json.artists.total;
        const artist = json.artists.items[0];
        this.setState({ artist });


        if (total !== 0) {
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
          fetch(FETCH_URL, fetchOptions)
            .then(response => response.json())
            .then(json => {
              const { tracks } = json;
              this.setState({ tracks });
            })
        }

      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">
          <img className="equalizer-svg" src={equalizerBoomBox} alt="BoomBox" />
        </div>

        <div className="form-group">
          <input className="search-box"
            name="q"
            size="40"
            type="text"
            placeholder="Search an artists. (for example Manowar)"
            value={this.state.query}
            onChange={event => { this.setState({ query: event.target.value }) }}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search()
              }
            }} />
          <input className="search-btn"
            value="Go"
            type="submit"
            onClick={() => this.search()} />

        </div>

        {
          this.state.artist !== null
            ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery tracks={this.state.tracks} />
            </div>
            : <div></div>
        }

      </div>
    )
  }
}

export default App;