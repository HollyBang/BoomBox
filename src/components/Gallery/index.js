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
          const trackPreview = track.preview_url ? track.preview_url : null;
          return (

            <div key={i} className="track" onClick={() => this.playTrack(trackPreview)}>
              <img src={trackImg} className="track-img" alt="track" />
              <div className="track-play">
                {
                  track.preview_url !== null
                    ? <div className="track-play-inner">
                      {
                        this.state.playingUrl === track.preview_url
                          ? <svg version="1.1" id="Слой_2" x="0px" y="0px"
                            viewBox="0 0 220 220" enableBackground="new 0 0 220 220" >
                            <path className="path" fill="none" stroke="#FF9D22" strokeWidth="5" strokeMiterlimit="10" d="M36.125,110c0-40.8,33.075-73.875,73.875-73.875 S183.875,69.2,183.875,110S150.8,183.875,110,183.875S36.125,150.8,36.125,110z M77.225,59v98.667 M142.333,59v98.667" />
                          </svg>
                          : <svg version="1.1" id="Слой_1" x="0px" y="0px"
                            viewBox="0 0 220 220" enableBackground="new 0 0 220 220" >
                            <path className="path" fill="none" stroke="#FF9D22" strokeWidth="5" strokeMiterlimit="10" d="M36.125 110c0-40.8 33.075-73.875 73.875-73.875 S183.875 69.2 183.875 110S150.8 183.875 110 183.875S36.125 150.8 36.125 110z M63 164.333l117.333-53.568L63 57.197V164.333z" />
                          </svg>
                      }

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