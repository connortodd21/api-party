import React, { Component } from 'react'
import './WeatherLocation.css'

class WeatherLocation extends Component {
    state = {
        currently : {
            summary : '',
            nearestStormDistance : '',
            precipProbability: '',
            temperature: '',
            humidity: '',
            windSpeed: '',
            pressure: '',
        }   
    }

    constructor(props) {
        super(props)
        this.fetchWeatherData(props)
    }

    componentWillMount = () => {
        this.fetchWeatherData(this.props)
    }

    componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location;
    if (locationChanged) {
      this.fetchWeatherData(nextProps);
    }
  }

    fetchWeatherData(props){
        const loc = (this.props.match.params.latlon)
        const comma = loc.split(' ')
        const url = comma[0]
        fetch(`https://api.darksky.net/forecast/43f05afb5ba911c1d4c6916632b63712/${url}`)
        .then(res => res.json())
        .then(data => {
            const currently = {
                summary: data.currently['summary'],
                nearestStormDistance: data.currently['nearestStormDistance'],
                precipProbability: data.currently['precipProbability'],
                temperature: data.currently['temperature'],
                humidity: data.currently['humidity'],
                windSpeed: data.currently['windSpeed'],
                pressure: data.currently['pressure']
            }
            this.setState({currently})
        })
        .catch(err => console.warn(err))
    }

    render(){
        const weather = this.state.currently
        return(
            <div>
                <img className="darkSky-logo" src="https://darksky.net/app/images/logo.png" alt="weather" />
                <div>
                    <form onClick={this.initMap}>
                        <button id="radarButton">Click Here to View Radar!</button>
                    </form>
                </div>
                <h2>The weather for: Indianapolis</h2>
                <h3>Summary: {weather.summary}</h3>
                <h3>Nearest Storm Distance: {weather.nearestStormDistance} miles</h3>
                <h3>Chance of rain: {weather.precipProbability} percent</h3>
                <h3>Temperature: {weather.temperature} farenheit </h3>
                <h3>Humidity: {weather.humidity} percent</h3>
                <h3>Wind Speed (mph): {weather.windSpeed} mph</h3>
                <h3>Pressure: {weather.pressure} pascals</h3>
            </div>
        )
    }
}

export default WeatherLocation