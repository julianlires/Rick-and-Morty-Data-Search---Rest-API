import React, { Component } from 'react';
import { getCharacters, getEpisodes, getLocations } from '../api';

export class EpisodeDetail extends Component {
  state = {
    characters: []
  };

  componentDidMount() {
    getCharacters(this.props.data.characters)
    .then(data => {
      this.setState({characters: data});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      getCharacters(this.props.data.characters)
      .then(data => {
        this.setState({characters: data});
      });
    }
  }

  render() {
    let header;
    if (this.props.previous){
      header =  <div className="row">
                  <div className="col-sm-1">
                    <button className="btn"
                            onClick={() => {
                              this.props.goPrevious(this.props.currentPages)
                            }}>
                            <i class="fa fa-arrow-left"></i>
                    </button>
                  </div>
                  <div className="col-sm-9 col-sm-offset-1"><h3>{this.props.data.name}</h3></div>
                </div>;
    } else {
      header =  <div className="row">
                  <div className="col-sm-12"><h3>{this.props.data.name}</h3></div>
                </div>;
    }
    return (
      <div className="card">
        <div className="card-header">{header}</div>
        <div className="card-body">
          <h5 className="card-title text-muted">{this.props.data.episode}</h5>
          <p className="card-text">{this.props.data.air_date}</p>
          <p className="card-text"><strong>Characters:</strong></p>
          <ul>
            {this.state.characters.map((ch) => {
              return(
                <li className="text-link" onClick={() => {this.props.addPage("character", ch, this.props.currentPages)}}>{ch.name}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}


export class CharacterDetail extends Component {
  state = {
    episodes: [],
    origin: null,
    location: null,
  };

  componentDidMount() {
    getEpisodes(this.props.data.episode)
    .then(data => {
      if (!Array.isArray(data)) data = [data];
      this.setState({episodes: data});
    });

    getLocations([this.props.data.origin.url])
    .then(data => {this.setState({origin: data});})

    getLocations([this.props.data.location.url])
    .then(data => {this.setState({location: data});})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      getEpisodes(this.props.data.episode)
      .then(data => {
        if (!Array.isArray(data)) data = [data];
        this.setState({episodes: data});
      });

      getLocations([this.props.data.origin.url])
      .then(data => {this.setState({origin: data});})

      getLocations([this.props.data.location.url])
      .then(data => {this.setState({location: data});})
    }
  }

  render() {
    let header;
    if (this.props.previous){
      header =  <div className="row">
                  <div className="col-sm-1">
                    <button className="btn"
                            onClick={() => {
                              this.props.goPrevious(this.props.currentPages)
                            }}>
                            <i class="fa fa-arrow-left"></i>
                    </button>
                  </div>
                  <div className="col-sm-9 col-sm-offset-1"><h3>{this.props.data.name}</h3></div>
                </div>;
    } else {
      header =  <div className="row">
                  <div className="col-sm-12"><h3>{this.props.data.name}</h3></div>
                </div>;
    }
    return (
      <div className="card">
        <div className="card-header">{header}</div>
        <div className="card-body">
          <div className="row">

            <div className="col-sm-6">
              <p className="card-text"><strong>Status:</strong> {this.props.data.status}</p>
              <p className="card-text"><strong>Species:</strong> {this.props.data.species}</p>
              <p className="card-text"><strong>Type:</strong> {this.props.data.type}</p>
              <p className="card-text"><strong>Gender:</strong> {this.props.data.gender}</p>
              <p className="card-text">
                <strong>Origin: </strong>
                {this.props.data.origin.url ?
                  <bold className="text-link"
                     onClick={() => {this.props.addPage("location", this.state.origin, this.props.currentPages)}}>
                     {this.props.data.origin.name}
                  </bold>
                :
                  <bold className="">{this.props.data.origin.name}</bold>
                }
              </p>
              <p className="card-text">
                <strong>Location: </strong>
                {this.props.data.location.url ?
                  <bold className="text-link"
                     onClick={() => {this.props.addPage("location", this.state.location, this.props.currentPages)}}>
                     {this.props.data.location.name}
                  </bold>
                :
                  <bold className="">{this.props.data.origin.name}</bold>
                }
              </p>
            </div>
            <div className="col-sm-6">
              <img src={this.props.data.image} alt={this.props.data.name}/>
            </div>
          </div>
          <br/>
          <p className="card-text"><strong>Episodes:</strong></p>
          <ul>
            {this.state.episodes.map((ep) => {
              return(
                <li className="text-link" onClick={() => {this.props.addPage("episode", ep, this.props.currentPages)}}>{ep.episode} - {ep.name}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}


export class LocationDetail extends Component {
  state = {
    residents: []
  };

  componentDidMount() {
    getCharacters(this.props.data.residents)
    .then(data => {
      if (!Array.isArray(data)) data = [data];
      this.setState({residents: data});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      getCharacters(this.props.data.residents)
      .then(data => {
        if (!Array.isArray(data)) data = [data];
        this.setState({residents: data});
      });
    }
  }

  render() {
    let header;
    if (this.props.previous){
      header =  <div className="row">
                  <div className="col-sm-1">
                    <button className="btn"
                            onClick={() => {
                              this.props.goPrevious(this.props.currentPages)
                            }}>
                            <i class="fa fa-arrow-left"></i>
                    </button>
                  </div>
                  <div className="col-sm-9 col-sm-offset-1"><h3>{this.props.data.name}</h3></div>
                </div>;
    } else {
      header =  <div className="row">
                  <div className="col-sm-12"><h3>{this.props.data.name}</h3></div>
                </div>;
    }
    return (
      <div className="card">
        <div className="card-header">{header}</div>
        <div className="card-body">
          <p className="card-text"><strong>Type:</strong> {this.props.data.type}</p>
          <p className="card-text"><strong>Dimension:</strong> {this.props.data.dimension}</p>
          <p className="card-text"><strong>Residents:</strong></p>
          <ul>
            {this.state.residents.map((re) => {
              return(
                <li className="text-link" onClick={() => {this.props.addPage("character", re, this.props.currentPages)}}>{re.name}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
