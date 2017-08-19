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
    console.log(this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    // let accessToken = this.state.accToken;
    let accessToken = 'BQBmqZa76xWgBMy1R8S9mWsYbT2HL1QQWZ-YLKgbz4I2XgQRfEYO4uUnpiDQYsu8Zn1MuneXIZRi_r6rjE1swDUenz3dACXpexESAX4066VuR9wC42Z-ZdlYDYF818rBsjAcSGzplBKCLcxeS8eFxNk-aEdHTNb0D8HTBMeBmXfpwxbPk4o';
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
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        console.log(FETCH_URL);
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
            console.log('artist top track: ', json);
            const { tracks } = json;
            this.setState({tracks});
          })
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