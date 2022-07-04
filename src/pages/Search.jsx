import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
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

  render() {
    const { inputSearch, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
