import React, { Component } from 'react';
import './../style.css';


class Gallery extends Component {
  render() {

    const { tracks } = this.props;
  
    return (
      <div>
        {tracks.map((track, i) => {
          const trackImg = track.album.images[0].url;
          return (
            <div key={i} className="track">
          <img src={trackImg} className="track-img" alt="track" />
          <p className="track-text">{track.name}</p>
          </div>
          )
        })}
      </div>
    );
  }
}

export default Gallery;