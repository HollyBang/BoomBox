import React, { Component } from 'react';
import './../style.css';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon
} from 'react-bootstrap';
import Profile from './../Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  search() {
    console.log(this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log(FETCH_URL);
    let accessToken = 'BQB-zI1uK2wJK8qbrQPHOm7-JfK3gD5iVdiqoXCNJbwSuDpmhvSpwc0LBJY-VY475hho5fVrzKTM7Mp9vtoEMTxxchxWOq4JeuoesNiQwu9Wh8KYvylWORSLDFT3mIgsRp6Guza23RKHBNljVnAEUoySQPS3kmcVhqYA-JsV3xUxKeO2dIU';
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
        console.log(json);
        const artist = json.artists.items[0];
        this.setState({ artist });
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
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;