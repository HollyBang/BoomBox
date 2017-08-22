import React, { Component } from 'react';
import './../style.css';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';
import Profile from './../Profile';
import Gallery from './../Gallery';

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
    // let accessToken = this.state.accToken;
    let accessToken = 'BQD-Ugmunfkq0n6Tzjig_Mfp1ZWZEw5uwUGMLq0KIoQGi8TaqNqwB_MiwaVPU-bRXjN0TU0WVkljgO0kvpIVeXqKnt9eFFPkncyfgaXrkBjv6O8f_73ReT9vXMZ5EmByolsQOSPuwGNFRH-lEqm6wL95dk-1yNFPhgKZiC3p8J2zpaMoXZ4';
    //refactor fetch OPTIONS!!!!!
    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    })
      .then(response => response.json())
      .then(json => {
        const total = json.artists.total;
        const artist = json.artists.items[0];
        this.setState({ artist });
     

        if (total !== 0) {
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
          fetch(FETCH_URL, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          })
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
        <div className="App-title">BoomBox</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => { this.setState({ query: event.target.value }) }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
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