import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      loading: false,
      albumResult: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const albumResult = await getMusics(id);
      const favorites = await getFavoriteSongs();
      const { artistName, collectionName } = albumResult[0];
      this.setState({
        artistName,
        collectionName,
        albumResult,
        favoriteSongs: favorites,
        loading: false,
      });
    });
  }

  render() {
    const {
      artistName, collectionName, loading, albumResult, favoriteSongs,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? (<Loading />) : (
          <div>
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            { albumResult
              .filter(({ kind }) => kind === 'song')
              .map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  favoriteSongs={ favoriteSongs }
                />
              )) }
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }),
}.isRequired;

export default Album;
