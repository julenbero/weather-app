import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

export default function SearchBar({ onSearch }) {
	const [ city, setCity ] = useState('');
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSearch(city);
				setCity('');
			}}>
			{/* <input type="text" placeholder="Ciudad..." value={city} onChange={(e) => setCity(e.target.value)} /> */}
			<Form.Row>
				<Col xs="auto">
					<Form.Group>
						<Form.Control
							type="text"
							size="sm"
							placeholder="Enter the City..."
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Form.Row>
		</form>
	);
}
