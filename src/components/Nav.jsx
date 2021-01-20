import React from 'react';
import SearchBar from './SearchBar.jsx';
import './Nav.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { WiDayHail } from 'react-icons/wi';

function Nav({ onSearch }) {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<Link to="/">
				<span className="navbar-brand">
					<WiDayHail />
					Weather App
				</span>
			</Link>
			<SearchBar onSearch={onSearch} />
			<Link to="/about">
				<Button variant="outline-secondary" size="sm">
					About
				</Button>
			</Link>
		</nav>
	);
}

export default Nav;
