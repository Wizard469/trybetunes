import React, { Component } from 'react';
import PropType, { object } from 'prop-types';
import Artist from './Artist';

class AlbumList extends Component {
  render() {
    const { searchResult } = this.props;
    return (
      <div>
        { searchResult.length === 0 ? 'Nenhum álbum foi encontrado'
          : searchResult.map(({ artistName, collectionName, collectionId }) => (
            <Artist
              key={ collectionId }
              artistName={ artistName }
              collectionName={ collectionName }
              collectionId={ collectionId }
            />
          ))}
      </div>
    );
  }
}

AlbumList.propTypes = {
  searchResult: PropType.arrayOf(object),
}.isRequired;

export default AlbumList;
