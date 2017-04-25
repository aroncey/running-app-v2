import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/App.css';
import '../assets/index.css'
import '../assets/running_man.css'
import SearchForm from './SearchForm'
import Results from './Results'
const API_KEY = "Y6VozHmxn5OcKm1lkM47LtueW16Uw5GS"

const introObject = new Object({phrase: "Plan your week's running schedule with Accuweather's running index"})


class App extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      results: [introObject],
      currentIndex: 0,
      searchAddress: "",
      errorMessage: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.generateDescription = this.generateDescription.bind(this)
    this.formattedDate = this.formattedDate.bind(this)
    this.forecastBuilder = this.forecastBuilder.bind(this)
  }

  handleReset(ev) {
    ev.preventDefault()
    this.setState({
      query: '',
      results: [introObject],
      currentIndex: 0,
      searchAddress: "",
      errorMessage: ""
    })
  }


  handleSubmit(ev) {
    ev.preventDefault()
    this.getLocationKey(this.state.query)
  }

  handleChange(ev) {
    let query = ev.target.value
    this.setState ({
      query: query
    })
  }

  handleInc(ev) {
    ev.preventDefault()
    this.setState({
      currentIndex: this.state.currentIndex + 1
    })
  }

  handleDec(ev) {
    ev.preventDefault()
    this.setState({
      currentIndex: this.state.currentIndex - 1
    })
  }

  getLocationKey(query) {
    let baseUrl = "http://dataservice.accuweather.com/locations/v1/search?apikey="
    let baseUrlWithApi = baseUrl + API_KEY + "&q="
    let searchUrl = baseUrlWithApi + query
    fetch(searchUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      this.setState({searchAddress: data[0].LocalizedName + ", " + data[0].AdministrativeArea.EnglishName})
      let locationKey = data[0].Key
      this.getIndices(locationKey)
    })
    .catch((error)=>{
      this.setState({errorMessage: "Please re-enter a valid location."})
    })
  }

  getIndices(key) {
     let url = "http://dataservice.accuweather.com/indices/v1/daily/5day/"
     let categoryId = "1"
     let baseUrlWithKey = url + key + "/"
     let searchUrl = baseUrlWithKey + categoryId + "?apikey=" + API_KEY
     fetch(searchUrl)
     .then((response)=>{
       return response.json()
     })
     .then((data)=>{
       data.map(this.forecastBuilder)
     })
     .catch((error)=>{
       this.setState({errorMessage: "Please retry your search"})
     })
  }


      generateDescription(object){
        switch (true) {
            case (object.Value <= 1):
                  object.phrase = `Please do not run ${object.dayName}`
                  break;
            case (object.Value > 1 && object.Value < 2):
                  object.phrase = `You would be crazy to run ${object.dayName}`
                  break;
            case (object.Value >= 2 && object.Value < 3):
                  object.phrase = `Really? It's not worth the effort to go out ${object.dayName}`
                  break;
            case (object.Value >= 3 && object.Value < 4):
                  object.phrase = `Eh, don't plan on it ${object.dayName}`
                  break;
            case (object.Value >= 4 && object.Value < 5):
                  object.phrase = `We wouldn't think you're crazy to run ${object.dayName}, but we don't know how much fun you'll have`
                  break;
            case (object.Value >= 5 && object.Value < 6):
                  object.phrase = `You may regret running ${object.dayName}`
                  break;
            case (object.Value >= 6 && object.Value < 7):
                  object.phrase = `It will be a mediocre day to run ${object.dayName}!`
                  break;
            case (object.Value >= 7 && object.Value < 8):
                  object.phrase = `It will be a nice day to run ${object.dayName}!`
                  break;
            case (object.Value >= 8 && object.Value < 9):
                  object.phrase = `It will be a lovely day to run ${object.dayName}!`
                  break;
            case (object.Value >= 9 && object.Value < 10):
                  object.phrase = `It will be a delightful day to run ${object.dayName}`
                  break;
            case (object.Value == 10):
                  object.phrase = `The weather will be out of this world ${object.dayName}!!!!`
                  break;
            default:
                alert("Not great");
                break;
            }
            return object
      }

  formattedDate(object){
   let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Today"];
   if (object.date.getUTCDay() === (new Date ()).getUTCDay()) {
     object.dayName = "today"
   } else {
       object.dayName = weekday[object.date.getUTCDay()]
       }
       object.nextDay = weekday[object.date.getUTCDay() + 1]
       return object
   }

  forecastBuilder(obj, index){
        let rawDate = obj.EpochDateTime
        let date = new Date(0)
        date.setUTCSeconds(rawDate)
        obj.date = date
        let formatted = this.formattedDate(obj)
        let described = this.generateDescription(formatted)
        this.setState({results: [...this.state.results,described]})
        if (this.state.results.length === 6) {
           this.setState({
             currentIndex: 1
           })
         }
    }


  render() {
    return (
      <div>
      <SearchForm onChange={this.handleChange} onSubmit={this.handleSubmit} results={this.state.results}/>
      <Results results={this.state.results} handleReset={this.handleReset} currentIndex={this.state.currentIndex} searchAddress={this.state.searchAddress} onInc={this.handleInc} onDec={this.handleDec} onReset={this.handleReset}/>
      </div>
    );
  }

}

export default App;


/* <div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
  <p className="App-intro">
    To get done, edit <code>src/App.js</code> and save to reload.
  </p>
</div> */
