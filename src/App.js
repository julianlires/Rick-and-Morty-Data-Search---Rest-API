import React, { Component } from 'react';
import './App.css';

import {debounce} from 'lodash';

import { EpisodeCard, CharacterCard, LocationCard } from './components/Cards';
import { EpisodeDetail, CharacterDetail, LocationDetail} from './components/Details';

import { searchEpisode, searchCharacter, searchLocation } from './api';


class App extends Component{
  state = {
    searchValue: "",
    pagination: 1,

    maxPageLocations: 1,
    maxPageCharacters: 1,
    maxPageEpisodes: 1,

    loadingCharacters: false,
    loadingLocations: false,
    loadingEpisodes: false,

    data_locations: [],
    data_characters: [],
    data_episodes: [],

    pages: [],
    checkedFilters: new Map([["check-1-episode", true],
                             ["check-2-character", false],
                             ["check-3-location", false],])
  };

  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleOnChange = event => {
    this.setState({ pagination: 1, data: [] });
    this.setState({ searchValue: event.target.value }, () => { this.searchAll() });
  }

  handleFilterChange = event => {
    const item = event.target.name;
    const isChecked = event.target.checked;
    console.log(item);
    console.log(isChecked);
    this.setState({ checkedFilters: this.state.checkedFilters.set(item, isChecked) });
  }

  componentDidMount() {
    this.searchAll();

    window.addEventListener('scroll', debounce(() => {
      console.log('scrolling stopped');
      this.setState({ pagination: this.state.pagination + 1 });
      console.log(this.state);
      this.updateAll();
    }, 1000));

  }

  searchAll(){
    searchEpisode(this.state.searchValue, 1)
    .then(jsonData => {
      console.log(jsonData);
      this.setState({ maxPageEpisodes: jsonData.info.pages, data_episodes: jsonData.results.map((x) => {return {"type": "episode", "data": x}})});
    })
    .catch((err) => {
      this.setState({ data_episodes: []});
    });

    searchCharacter(this.state.searchValue, 1)
    .then(jsonData => {
      console.log(jsonData);
      this.setState({ maxPageCharacters: jsonData.info.pages, data_characters: jsonData.results.map((x) => {return {"type": "character", "data": x}})});
    })
    .catch((err) => {
      this.setState({ data_characters: []});
    });

    searchLocation(this.state.searchValue, 1)
    .then(jsonData => {
      console.log(jsonData);
      this.setState({ maxPageLocations: jsonData.info.pages, data_locations: jsonData.results.map((x) => {return {"type": "location", "data": x}})});
    })
    .catch((err) => {
      this.setState({ data_locations: []});
    });
  }

  updateAll(){
    if (this.state.maxPageEpisodes + 1 > this.state.pagination){
      this.setState({ loadingEpisodes: true });
      searchEpisode(this.state.searchValue, this.state.pagination)
      .then(jsonData => {
        this.setState({ data_episodes: [...this.state.data_episodes,
                                        ...jsonData.results.map((x) => {return {"type": "episode", "data": x}})]});
      })
      .catch((err) => {
        this.setState({ loadingEpisodes: false, data_episodes: this.state.data_episodes});
      });
    }

    if (this.state.maxPageCharacters + 1 > this.state.pagination){
      this.setState({ loadingCharacters: true });
      searchCharacter(this.state.searchValue, this.state.pagination)
      .then(jsonData => {
        this.setState({ data_characters: [...this.state.data_characters,
                                        ...jsonData.results.map((x) => {return {"type": "character", "data": x}})]});
      })
      .catch((err) => {
        this.setState({ loadingCharacters: false, data_characters: this.state.data_characters});
      });
    }

    if (this.state.maxPageLocations + 1 > this.state.pagination){
      this.setState({ loadingLocations: true });
      searchLocation(this.state.searchValue, this.state.pagination)
      .then(jsonData => {
        this.setState({ data_locations: [...this.state.data_locations,
                                        ...jsonData.results.map((x) => {return {"type": "location", "data": x}})]});
      })
      .catch((err) => {
        this.setState({ loadingLocations: false, data_locations: this.state.data_locations});
      });
    }
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
          {(this.state.checkedFilters.get("check-1-episode")) ?
            this.state.data_episodes.map((item) => {
              return(
              <div className="col-sm-12 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
                <EpisodeCard episode={item.data} />
              </div>
              )
          }) : null}
          {(this.state.checkedFilters.get("check-2-character")) ?
            this.state.data_characters.map((item) => {
              return(
              <div className="col-sm-12 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
                <CharacterCard character={item.data} />
              </div>
              )
          }) : null}
          {(this.state.checkedFilters.get("check-3-location")) ?
            this.state.data_locations.map((item) => {
              return(
              <div className="col-sm-12 div-link search-result" onClick={() => this.setState({ pages: [item] })}>
                <LocationCard location={item.data} />
              </div>
              )
          }) : null}
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

  render() {
    return (
      <div className="body-content">
        <img id="rick-image" src={require('./rick.png')} alt="" />
        <img id="morty-image" src={require('./morty.png')} alt="" />
        <div className="container header-title">
          <h1 className="text-center">Rick and Morty Search Engine</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6" id="search-data">
              <div id="search-bar" className="row">
                <div className="col-sm-12">
                  <input className="form-control"
                       name="text"
                       type="text"
                       placeholder="Search"
                       onChange={event => this.handleOnChange(event)}
                       value={this.state.searchValue}/>
                </div>
                <div className="col-sm-12">
                  <label key="checkbox1">
                    Episode
                    <input type="checkbox" name="check-1-episode" checked={this.state.checkedFilters.get("check-1-episode")} onChange={this.handleFilterChange} />
                  </label>
                  <label key="checkbox2">
                    Character
                    <input type="checkbox" name="check-2-character" checked={this.state.checkedFilters.get("check-1-character")} onChange={this.handleFilterChange} />
                  </label>
                  <label key="checkbox3">
                    Location
                    <input type="checkbox" name="check-3-location" checked={this.state.checkedFilters.get("check-1-location")} onChange={this.handleFilterChange} />
                  </label>
                </div>
              </div>
              <br/>
              <br/>
              <div id="search-results">
                  { this.renderSearchResults() }
              </div>
            </div>
            <div className="container pages">
              <div className="row justify-content-end">
                <div className="col-sm-6">
                  { this.renderDetailPages() }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="end-box"></div>
      </div>
    );
  }
}

export default App;
