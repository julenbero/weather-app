import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import './Details.css';
const { REACT_APP_APIKEY } = process.env;

export default class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city : {}
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${REACT_APP_APIKEY}&units=metric`)
			.then((r) => r.json())
			.then((result) => {
				this.setState({
					city : result
				});
			});
	}

	render() {
		const city = this.state.city;
		if (!city.main) return <Spinner animation="border" role="status" />;
		return (
			<div className="card-details">
				<h2 className="card-title">{city.name}</h2>
				<div className="card-body">
					<div>Temperature: {city.main.temp} ºC</div>
					<div>Weather: {city.weather[0].main}</div>
					<div>Wind: {city.wind.speed} km/h</div>
					<div>Clouds Count: {city.clouds.all}</div>
					<div>Latitude: {city.coord.lat}º</div>
					<div>Longitude: {city.coord.lon}º</div>
				</div>
			</div>
		);
	}
}
