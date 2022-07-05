import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { string, number } from 'prop-types';

class Artist extends Component {
  render() {
    const { artistName, collectionName, collectionId } = this.props;
    return (
      <div>
        <p>{ artistName }</p>
        <p>{ collectionName }</p>
        <NavLink
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          { collectionId }
        </NavLink>
      </div>
    );
  }
}

Artist.propTypes = {
  artistName: string,
  collectionId: number,
  collectionName: string,
}.isRequired;

export default Artist;
