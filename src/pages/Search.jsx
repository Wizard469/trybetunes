import React, { Component } from 'react';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
      loading: false,
      artistOrAlbum: '',
      searchResult: [],
    };
  }

  buttonValidation = ({ target }) => {
    const minChars = 2;
    const { value } = target;
    if (value.length >= minChars) {
      this.setState({
        inputSearch: value,
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        inputSearch: value,
        isButtonDisabled: true,
      });
    }
  };

  onHandleClick = () => {
    const { inputSearch } = this.state;
    this.setState({
      inputSearch: '',
      isButtonDisabled: true,
      loading: true,
      artistOrAlbum: inputSearch,
    }, async () => {
      this.setState({ searchResult: await searchAlbumsAPI(inputSearch), loading: false });
    });
  };

  render() {
    const {
      inputSearch, isButtonDisabled, loading, artistOrAlbum, searchResult,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            Banda ou Artista
            <input
              id="name"
              type="text"
              value={ inputSearch }
              data-testid="search-artist-input"
              onChange={ this.buttonValidation }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ () => this.onHandleClick() }
          >
            Pesquisar
          </button>
        </form>
        { loading ? (<Loading />) : (artistOrAlbum && (
          <div>
            { `Resultado de álbuns de: ${artistOrAlbum}` }
            <AlbumList searchResult={ searchResult } />
          </div>
        )
        ) }
      </div>
    );
  }
}

export default Search;
