import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const [selectedCity, setSelectedCity] = useState('Select City');
  const [selectedState, setSelectedState] = useState('Select State');

  let fetchCountries = () => {
    fetch("https://crio-location-selector.onrender.com/countries")
        .then(res => res.json())
        .then(data => {
          setCountries([...data, 'Select Country']);
        })
        .catch(error => console.log(error));
  }

  let fetchStates = () => {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(res => res.json())
        .then(data => setStates([...data, 'Select State']))
        .catch(error => console.log(error));
  }

  let fetchCities = (countryName, stateName) => {
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(res => res.json())
        .then(data => setCities([...data, 'Select City']))
        .catch(error => console.log(error));
  }

  useEffect(() => {fetchCountries(); fetchStates(); fetchCities();}, [selectedCountry, selectedState, selectedCity]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select style={{minWidth: '15rem'}} value={selectedCountry} onChange={(event)=>{setSelectedCountry(event.target.value);}}>
        {countries.map((country, index) => (<option key={index} value={country}>{country}</option>))}
      </select>
        <select style={{minWidth: '15rem'}} value={selectedState} onChange={(event)=>{setSelectedState(event.target.value);}}>
            {states.map((state, index) => (<option key={index} value={state}>{state}</option>))}
        </select>
        <select style={{minWidth: '15rem'}} value={selectedCity} onChange={(event)=>{setSelectedCity(event.target.value)}}>
            {cities.map((city, index) => (<option key={index} value={city}>{city}</option>))}
        </select>
      {
        selectedCity !== 'Select City' && (<h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>)
      }
    </div>
  );
}

export default App;
