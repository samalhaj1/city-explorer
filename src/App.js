import React, { Component } from "react";
import axios from 'axios';
import CityForm from "./compnents/CityForm";
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {},
      weather: [],
      weatherData: [],
      moviesData: [],
      toggleShowHide: false,
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.locationName)




    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;
    // console.log(process.env.REACT_APP_LOCATION_IQ_KEY)
    // console.log( `https://localhost:3031?city_name=${this.state.locationName}`)

    // const backendUrl = `https://localhost:3031/weather?city_name=${this.state.locationName}`;
    // const backEndResponse = await axios.get(backendUrl)

    const response = await axios.get(url);

    console.log(response.data[0]);
    this.setState({
      locationData: response.data[0],
      // weather: backEndResponse
    });
    //http://localhost:3031/movies?query=amman

    const weathersUrl = `http://localhost:3031/weather?city=${this.state.locationName}`;
    const weatherResponse = await axios.get(weathersUrl);
    this.setState({
      weatherData: weatherResponse.data
    });
    console.log(response.data)
    
    const moviesUrl = `http://localhost:3031/movies?query=${this.state.locationName}`;
    const moviesResponse = await axios.get(moviesUrl);
    this.setState({
      moviesData: moviesResponse.data,
      toggleShowHide: !this.state.toggleShowHide
    })
    console.log(moviesResponse)


  }




  render() {
   
    return (
      <div>
        <CityForm handelSubmit={this.handelSubmit} handelLocationNameChange={this.handelLocationNameChange} />

        <h2>Location Info</h2>
        <p>{this.state.locationData.display_name}</p>
        <p>lat: {this.state.locationData.lat}</p>
        <p>lon: {this.state.locationData.lon}</p>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15&size=600x600`} alt="" />



        {this.state.weatherData.map((item) => {
          return (  <p> { item.date } { item.desc }{ item.max }{ item.desc }{ item.icon }</p> 
         
          )
        })}
      </div>

    );
  }
}

export default App
//the end
//the lab is done 

