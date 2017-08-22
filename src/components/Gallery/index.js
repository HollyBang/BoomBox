import React, { Component } from 'react';
import './../style.css';



class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playTrack(previewUrl) {
    if (previewUrl !== null) {
      let audio = new Audio(previewUrl);
      if (!this.state.playing) {
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      } else {
        if (this.state.playingUrl === previewUrl) {
          this.state.audio.pause();
          this.setState({
            playing: false
          })
        } else {
          this.state.audio.pause();
          audio.play();
          this.setState({
            playing: true,
            playingUrl: previewUrl,
            audio
          });
        }
      }
    }

  }

  render() {

    const { tracks } = this.props;

    return (
      <div>
        {tracks.map((track, i) => {
          const trackImg = track.album.images[0].url;
          console.log(track.preview_url);
          const trackPreview = track.preview_url ? track.preview_url : null;
          return (

            <div key={i} className="track" onClick={() => this.playTrack(trackPreview)}>
              <img src={trackImg} className="track-img" alt="track" />
              <div className="track-play">
                {
                  track.preview_url !== null
                    ? <div className="track-play-inner">
                      
                    </div>
                    : <div></div>
                }

              </div>
              <p className="track-text">{track.name}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Gallery;