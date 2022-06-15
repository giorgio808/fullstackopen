import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [countries, setCountries] = useState([])
	const [newFilter, setNewFilter] = useState('text')

	//connects to the countries api
	useEffect(() => {
		console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}, [])
	console.log('render', countries.length, 'countries')
	
	
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value)
	}

	/* Filter Component */
	const filterByCountryName = countries.filter((country) => 
		country.name.common
			.toLowerCase()
			.includes(newFilter.toLowerCase())
	)
	//gets the country information
	const getCountry = (country) => {
		console.log("getCountry:", country)
		return (
			<div>
				<h1>{country.name.common}</h1>
				<div>capital: {country.area}</div>
				<div>area: {country.area}</div>
				<h2>Languages</h2>
				<ul>
					{Object.keys(country.languages).map((key) => {
						console.log("key", key)
						return <li key={key}>{country.languages[key]}</li>
					})}
				</ul>
				<img src = {country.flags.png} alt="flag" />
			</div>
		)
	}

	//filters countries 
 	const showFilteredCountries = (array) => {
		console.log("filtered array", array)
		return (
			array.map((country) => {
				return (
					<div key={country.name.common}>
						{country.name.common} <button> show </button>
					</div>
				)
			})
		)
	}

	//if the number of countries < 10, returns them 
	const filtering = () => {
		//if country is greater than 10 return string
		if (filterByCountryName.length > 10) {
			return (
				"Too many matches, please specify another filter"
			)
		} 
		if (filterByCountryName.length == 1) {
			console.log('languages', filterByCountryName[0].languages)
			return (
				<div>
					<h1>{filterByCountryName[0].name.common}</h1>
					<div>capital: {filterByCountryName[0].capital}</div>
					<div>area: {filterByCountryName[0].area}</div>
					<h2>Languages</h2>
					<ul>
						{Object.keys(filterByCountryName[0].languages).map((key) => {
              console.log("key", key);
              return <li key={key}>{filterByCountryName[0].languages[key]}</li>;
            })}
					</ul>
					<img src={filterByCountryName[0].flags.png} alt="flag" />
				</div>
			)
		}
		//returns the name of the countries by name 
		return (
			showFilteredCountries(filterByCountryName)
		)
		
	}

	return (
		<div>
			<div>
				find countries:
				<input 
					value={newFilter} 
					onChange={handleFilterChange} 
				/>
			</div>
			<div>
				{filtering()}
			</div>
		</div>
	)
}

export default App;
