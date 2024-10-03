import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');

  let fetchCountries = () => {
    fetch("https://crio-location-selector.onrender.com/countries")
        .then(res => res.json())
        .then(data => {
          setCountries(data);
        })
        .catch(error => console.error(error));
  }

  let fetchStates = () => {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(res => res.json())
        .then(data => setStates(data))
        .catch(error => console.error(error));
  }

  let fetchCities = (countryName, stateName) => {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(error => console.error(error));
  }

  useEffect(() => {fetchCountries(); fetchStates(); fetchCities();}, [selectedCountry, selectedState, selectedCity]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select style={{minWidth: '15rem'}} value={selectedCountry} defaultValue='Select Country' onChange={(event)=>{setSelectedCountry(event.target.value);}}>
        <option value="Select Country">Select Country</option>
        {countries.map((country, index) => (<option key={index} value={country}>{country}</option>))}
      </select>
        <select style={{minWidth: '15rem'}} value={selectedState} defaultValue='Select State' onChange={(event)=>{setSelectedState(event.target.value);}}>
          <option value="Select State">Select State</option>
            {states.map((state, index) => (<option key={index} value={state}>{state}</option>))}
        </select>
        <select style={{minWidth: '15rem'}} value={selectedCity} defaultValue='Select City' onChange={(event)=>{setSelectedCity(event.target.value)}}>
          <option value="Select City">Select City</option>
            {cities.map((city, index) => (<option key={index} value={city}>{city}</option>))}
        </select>
      {
        selectedCity !== '' && (<h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>)
      }
    </div>
  );
}

export default App;
