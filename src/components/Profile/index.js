import React, { Component } from 'react';

import './../style.css';


class Profile extends Component {

  render() {
    let artist = {
      name: '',
      followers: { total: '' },
      images: [{ url: '' }],
      genres: []
    };
    artist = this.props.artist !== undefined ? this.props.artist : artist;
    
    return (
      <div className='card'>
        <div className='card_left'>
          <img src={artist.images[0].url} alt="Profile" />
        </div>
        <div className='card_right'>
          <h1>{artist.name}</h1>
          <div className='card_right__details'>
            {
              artist.genres.map((genre, i) => {
                genre = genre !== artist.genres[artist.genres.length - 1] ? ` ${genre},` : `  ${genre}`;
                return (
                  <span key={i}>{genre} </span>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;



