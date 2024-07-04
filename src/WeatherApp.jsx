import { useState, useEffect } from 'react';
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from "./assets/logo.png";
import "./WeatherApp.css";

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h6: {
            fontWeight: 700,
        },
    },
});

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        City: "Pune",
        Humidity: 38,
        Max_temperature: 32.86,
        Min_temperature: 32.86,
        Temperature: 32.86,
        Weather: "clear sky",
        Wind_speed: 6.78,
        feelsLike: 33.1,
    });

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='bgSetup'>
                <AppBar position="sticky" style={{backgroundColor:"white"}}>
                    <Toolbar style={{ justifyContent: isSmallScreen ? "start" : "center" }}>
                        <div id="header">
                            <img src={logo} alt="Weather Icon" style={{ height: "50px", width: "50px" }} />
                            {!isSmallScreen && (
                                <Typography variant="h4" className='header-name' style={{fontWeight: "bold", }}>
                                    Atmosphero
                                </Typography>
                                
                            )}
                        </div>
                        {isSmallScreen && (
                            <Typography variant="h5" className="header-name" style={{fontWeight: "bold" }}>
                                Atmosphero
                            </Typography>
                            )}
                    </Toolbar>
                </AppBar>
                <div className="marquee-container">
                    <div className="marquee">
                        <p>Welcome to Atmosphero Weather App! Get real-time weather updates for any city.</p>
                    </div>
                </div>
                <div className="bodyComponent" style={{ textAlign: "center", padding: "5px" }}
                data-aos="zoom-in"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine">
                    <SearchBox
                        className="searchBox"
                        updateInfo={updateInfo}
                    />
                    <img src="" alt="" />
                    <InfoBox info={weatherInfo} />
                </div>
            </div>
        </ThemeProvider>
    );
}
