import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {debounce} from 'lodash';

import { EpisodeCard, CharacterCard, LocationCard } from './components/Cards';
import { EpisodeDetail, CharacterDetail, LocationDetail} from './components/Details';

import { searchEpisode, searchCharacter, searchLocation } from './api';


class App extends Component{
  state = {
    searchValue: "",
    pagination: 1,
    maxPage: 1,
    loading: false,
    data_locations: [],
    data_characters: [],
    data_episodes: [],
    pages: []
  };

  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = event => {
    this.setState({ pagination: 1, data: [] });
    this.setState({ searchValue: event.target.value }, () => { this.searchAll() });
  }

  searchAll(){
    searchEpisode(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_episodes: jsonData.results.map((x) => {return {"type": "episode", "data": x}})});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_episodes: []});
    });
    searchCharacter(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_characters: jsonData.results.map((x) => {return {"type": "character", "data": x}})});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_characters: []});
    });
    searchLocation(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_locations: jsonData.results.map((x) => {return {"type": "location", "data": x}})});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_locations: []});
    });
  }

  updateAll(){
    searchEpisode(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_episodes: [...this.state.data_episodes,
                                      ...jsonData.results.map((x) => {return {"type": "episode", "data": x}})]});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_episodes: this.state.data_episodes});
    });
    searchCharacter(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_characters: [...this.state.data_characters,
                                      ...jsonData.results.map((x) => {return {"type": "character", "data": x}})]});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_characters: this.state.data_characters});
    });
    searchLocation(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ data_locations: [...this.state.data_locations,
                                      ...jsonData.results.map((x) => {return {"type": "location", "data": x}})]});
      console.log(this.state);
    })
    .catch((err) => {
      this.setState({ data_locations: this.state.data_locations});
    });
  }

  addPage = (type, data, currentPages) => {
    this.setState({pages: [...currentPages, {"type": type, "data": data}]});
  }

  popPage = (currentPages) => {
    let newPages = currentPages;
    newPages.pop();
    this.setState({pages: newPages});
  }

  renderDetailPages(){
    if (this.state.pages.length > 0){
      const current = this.state.pages[this.state.pages.length -1];
      if (current.type === "episode"){
        return(
          <EpisodeDetail data={current.data}
                         addPage={this.addPage}
                         currentPages={this.state.pages}
                         previous={this.state.pages.length > 1}
                         goPrevious={this.popPage}/>
        )
      }
      if (current.type === "character"){
        return(
          <CharacterDetail data={current.data}
                           addPage={this.addPage}
                           currentPages={this.state.pages}
                           previous={this.state.pages.length > 1}
                           goPrevious={this.popPage}/>
        )
      }
      if (current.type === "location"){
        return(
          <LocationDetail data={current.data}
                           addPage={this.addPage}
                           currentPages={this.state.pages}
                           previous={this.state.pages.length > 1}
                           goPrevious={this.popPage}/>
        )
      }
    }
  }

  renderSearchResults(){
    if (this.state.data_episodes ||  this.state.data_locations || this.state.data_characters) {
      return (
        <div className="row">
          {this.state.data_episodes.map((item) => {
            return(
            <div className="col-sm-4 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
              <EpisodeCard episode={item.data} />
            </div>
            )
          })}
          {this.state.data_characters.map((item) => {
            return(
            <div className="col-sm-4 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
              <CharacterCard character={item.data} />
            </div>
            )
          })}
          {this.state.data_locations.map((item) => {
            return(
            <div className="col-sm-4 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
              <LocationCard location={item.data} />
            </div>
            )
          })}
        </div>
      );
    }
    else {
      return (
        <div>
          <p>No results</p>
        </div>
      );
    }
  }

  componentDidMount() {
    searchEpisode(this.state.searchValue, this.state.pagination)
    .then(jsonData => {
      this.setState({ pagination: 1,
                      data_episodes: jsonData.results.map((x) => {return {"type": "episode", "data": x}})});
      console.log(this.state);
    });

    window.addEventListener('scroll', debounce(() => {
      console.log('scrolling stopped');
      this.setState({pagination: this.state.pagination + 1});
      this.updateAll()
    }, 1000));

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Rick and Morty Search Engine</h1>
        </div>
        <div className="row">
          <div className="col-sm-6" id="search-data">
            <div id="search-bar" className="row">
              <div className="col-sm-8 col-sm-offset-2">
              <input className="form-control"
                     name="text"
                     type="text"
                     placeholder="Search"
                     onChange={event => this.handleOnChange(event)}
                     value={this.state.searchValue}/>
              </div>
            </div>
            <br/>
            <br/>
            <div id="search-results">
                { this.renderSearchResults() }
            </div>
          </div>
          <div className="container-fluid pages">
            <div className="row justify-content-end">
              <div className="col-sm-6">
                { this.renderDetailPages() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
