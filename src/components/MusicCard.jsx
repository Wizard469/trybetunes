import { string, number } from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = { favorite: false, loading: false };
  }

  OnHandleChange = async ({ target }) => {
    const { trackId } = this.props;
    const { checked } = target;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({ loading: false, favorite: checked });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        { loading ? (<Loading />) : (
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={ favorite }
              onChange={ this.OnHandleChange }
            />
          </label>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: string,
  trackName: string,
  trackId: number,
}.isRequired;

export default MusicCard;
