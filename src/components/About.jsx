import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function About() {
	return (
		<div>
			<Jumbotron fluid>
				<h1>Weather App</h1>
				<br />
				<h3>Project using API https://openweathermap.org/</h3>
			</Jumbotron>
		</div>
	);
}
