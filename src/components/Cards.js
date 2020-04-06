import React, { Component } from 'react';

export  class EpisodeCard extends Component {
  render() {
    return (
      <div className="card text-white">
        <div className="card-body">
          <span className="badge badge-primary">Episode</span>
          <h6 className="card-subtitle mb-2"> {this.props.episode.episode} - {this.props.episode.name.substring(0, 15)}{(this.props.episode.name.length > 15)? "...":""}</h6>
          <p className="card-text">{this.props.episode.air_date}</p>
        </div>
      </div>
    );
  }
}

export  class CharacterCard extends Component {
  render() {
    return (
      <div className="card text-white">
        <div className="card-body">
          <span className="badge badge-light">Character</span>
          <h6 className="card-subtitle mb-2"> {this.props.character.name}</h6>
          <p className="card-text">{this.props.character.status}</p>
        </div>
      </div>
    );
  }
}

export  class LocationCard extends Component {
  render() {
    return (
      <div className="card text-white">
        <div className="card-body">
          <span className="badge badge-warning">Location</span>
          <h6 className="card-subtitle mb-2"> {this.props.location.name} - {this.props.location.type}</h6>
        </div>
      </div>
    );
  }
}
