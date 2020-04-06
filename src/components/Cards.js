import React, { Component } from 'react';

export  class EpisodeCard extends Component {
  render() {
    return (
      <div className="card text-white bg-info mb-3">
        <h5 className="card-header">{this.props.episode.name}</h5>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{this.props.episode.episode}</h6>
          <p className="card-text">{this.props.episode.air_date}</p>
        </div>
      </div>
    );
  }
}

export  class CharacterCard extends Component {
  render() {
    return (
      <div className="card text-white bg-secondary mb-3">
        <h5 className="card-header">{this.props.character.name}</h5>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{this.props.character.statuus}</h6>
          <p className="card-text">Location: {this.props.character.location.name}</p>
        </div>
      </div>
    );
  }
}

export  class LocationCard extends Component {
  render() {
    return (
      <div className="card text-white bg-warning mb-3">
        <h5 className="card-header">{this.props.location.name}</h5>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{this.props.location.type}</h6>
          <p className="card-text">{this.props.location.dimension}</p>
        </div>
      </div>
    );
  }
}
