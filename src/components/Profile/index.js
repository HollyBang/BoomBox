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
    artist = this.props.artist !== null ? this.props.artist : artist;

    return (
      <div className="Profile">
        <img className="profile-img" src={artist.images[0].url} alt="Profile image" />
        <div>{artist.name}</div>
        <div>{artist.followers.total}</div>
        <div>
          {
            artist.genres.map((genre, k) => {
              genre = genre !== artist.genres[artist.genres.length-1] ? ` ${genre},` : ` & ${genre}`;
              return (
                <span key={k}>{genre} </span>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Profile;