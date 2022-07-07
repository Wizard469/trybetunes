import PropTypes, { string, number, object } from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = { favorite: false, loading: false };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  OnHandleChange = async ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true, favorite: checked }, async () => {
      const { trackId } = this.props;
      const { favorite } = this.state;
      const addOrRemoveSong = favorite ? addSong : removeSong;
      await addOrRemoveSong(trackId);
      this.setState({ loading: false });
    });
  }

  fetchFavorites = async () => {
    const { trackId, favoriteSongs } = this.props;
    const favorite = favoriteSongs.some(({ trackId: id }) => id === trackId);
    this.setState({ favorite });
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
  favoriteSongs: PropTypes.arrayOf(object),
}.isRequired;

export default MusicCard;
