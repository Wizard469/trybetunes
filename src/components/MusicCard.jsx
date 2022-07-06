import { string } from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: string,
  trackName: string,
}.isRequired;

export default MusicCard;
