import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import "./InfoBox.css";

export default function InfoBox({ info }) {
    const COLD_URL = "../src/assets/cold.jpg";
    const HOT_URL = "../src/assets/sunny.jpg";
    const RAIN_URL = "../src/assets/rain.jpg";

    return (
        <div className="InfoBox">
            <Card className="infocard"style={{width:"100%",borderRadius:"10px"}}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={
                        info.Humidity >= 80 ? RAIN_URL : info.Temperature >= 25 ? HOT_URL : COLD_URL
                    }
                    title="Weather Condition"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <b>{info.City}
                            {info.Humidity >= 80 ? <ThunderstormIcon style={{ color: "lightblue" }} /> : info.Temperature >= 25 ? <Brightness5Icon style={{ color: "red" }} /> : <AcUnitIcon style={{ color: "blue" }} />}
                        </b>
                    </Typography>
                    <Typography variant="body1" component="span" className="textBody">
                        <hr />
                        <p>Temperature: {info.Temperature}&deg;C</p>
                        <hr />
                        <p>Humidity: {info.Humidity}%</p>
                        <hr />
                        <p>Min Temperature: {info.Min_temperature}&deg;C</p>
                        <hr />
                        <p>Max Temperature: {info.Max_temperature}&deg;C</p>
                        <hr />
                        <p>Wind Speed: {info.Wind_speed} km/h</p>
                        <hr />
                        <p>
                            The weather is described as <i style={{color:"red"}}>{info.Weather}</i> and feels like {info.feelsLike}&deg;C.
                        </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
