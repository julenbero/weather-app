import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About.jsx';
import Details from '../components/Details.jsx';

const { REACT_APP_APIKEY } = process.env;

function App() {
	const [ cities, setCities ] = useState([]);
	const [ visibleDup, setVisibleDup ] = useState(false);
	const [ visibleFound, setVisibleFound ] = useState(false);
	function onClose(id) {
		setCities((oldCities) => oldCities.filter((c) => c.id != id));
	}
	function onSearch(city_entry) {
		//Llamado a la API del clima
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city_entry}&appid=${REACT_APP_APIKEY}&units=metric`)
			.then((r) => r.json())
			.then((result) => {
				if (result.main !== undefined) {
					const city_result = {
						min      : Math.round(result.main.temp_min),
						max      : Math.round(result.main.temp_max),
						img      : result.weather[0].icon,
						id       : result.id,
						wind     : result.wind.speed,
						temp     : result.main.temp,
						name     : result.name,
						weather  : result.weather[0].main,
						clouds   : result.clouds.all,
						latitud  : result.coord.lat,
						longitud : result.coord.lon
					};
					const cityFound = cities.find((city) => city.id === city_result.id);
					if (!cityFound) {
						setCities((oldCities) => [ ...oldCities, city_result ]);
					} else {
						//alert('Ciudad ya se encuentra en el listado');
						setVisibleDup(true);
						window.setTimeout(() => {
							setVisibleDup(false);
						}, 2000);
					}
				} else {
					//alert('Ciudad no encontrada');
					setVisibleFound(true);
					window.setTimeout(() => {
						setVisibleFound(false);
					}, 2000);
				}
			});
	}
	function onFilter(cityId) {
		let city = cities.filter((cityfind) => cityfind.id == parseInt(cityId));
		if (city.length > 0) {
			return city[0];
		} else {
			return null;
		}
	}

	return (
		<div className="App">
			<Route path="/" render={() => <Nav onSearch={onSearch} />} />
			<Route path="/" exact render={() => <Cards cities={cities} onClose={onClose} />} />
			<Route path="/about" component={About} />
			<Route
				path="/ciudad/:id"
				render={({ match }) => <Details match={match} city={onFilter(match.params.id)} />}
			/>
			<div className="alerts">
				<Alert variant="danger" show={visibleDup}>
					Ciudad ya se encuentra en el listado
				</Alert>
				<Alert variant="danger" show={visibleFound}>
					Ciudad no encontrada
				</Alert>
			</div>
		</div>
	);
}

export default App;
