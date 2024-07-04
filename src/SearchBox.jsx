import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_REACT_APP_REACT_KEY;

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("Pune");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getWeatherInfo = async () => {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            const jsonResponse = await response.json();

            if (!response.ok || jsonResponse.cod !== 200) {
                throw new Error(jsonResponse.message || 'Unknown error');
            }

            const result = {
                City: city,
                Weather: jsonResponse.weather[0].description,
                feelsLike: jsonResponse.main.feels_like,
                Temperature: jsonResponse.main.temp,
                Humidity: jsonResponse.main.humidity,
                Min_temperature: jsonResponse.main.temp_min,
                Max_temperature: jsonResponse.main.temp_max,
                Wind_speed: jsonResponse.wind.speed,
            };
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setError(false);
        setLoading(true);

        try {
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className='SearchBox'>
                <br />
                <form onSubmit={handleSubmit}>
                    <TextField 
                    id="city" 
                    label="City Name" 
                    variant="standard" 
                    required value={city} 
                    onChange={handleChange}
                    />
                    <br /><br />
                    <Button variant="contained" type='submit' disabled={loading}>
                        {loading ? 'Loading...' : 'Search'}
                    </Button>
                    {error && <p>This place does not exist</p>}
                </form>
            </div>
        </div>
    );
}