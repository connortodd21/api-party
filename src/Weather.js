import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import WeatherLocation from './WeatherLocation.js'
import './Weather.css'

class Weather extends Component {
    state = {
        latlon: ''
    }

    handleChange = (ev) => {
        const latlon = ev.currentTarget.value
        this.setState({ latlon })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        this.props.history.push(`/weather/${this.state.latlon}`)
    }

    getLocation = (ev) => {
        ev.preventDefault()
        console.log('line 51')
        if (navigator.geolocation) {
            console.log('inside if')
            navigator.geolocation.getCurrentPosition( (position) => {
                console.log('in func')
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                let latlon = lat + ',' + lng
                console.log(latlon)
                console.log(this)
                this.setState({latlon})
                document.getElementById('location').value = lat + ',' + lng
            })
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }




    render = () => {
        return (
            <div className="dark-sky">
                <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
                <form onSubmit={this.getLocation} className="work">
                    <button id="getCurrentLocation" className="getlocation">Get coordinates</button>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="location"
                            type="text"
                            value={this.state.latlon}
                            onChange={this.handleChange}
                            placeholder="Enter longitude and latitude"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" id="lookUpWeather">Look up weather</button>
                    </div>
                </form>
                <Route path='/weather/:latlon' component={WeatherLocation}></Route>
                <script async defer
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbJOwQzFiPz9OkWdXi5pcD1dCSi800cX0">
                 </script>
            </div>
        )
    }
}

export default Weather



