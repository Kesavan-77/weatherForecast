import React, {useState} from 'react';
import './App.css';
import logo from './assets/logo.png'
const api = {
  key:"903259d8f2d9388005e1c8390676551e",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query,setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    evt.preventDefault();
    if (query.trim().length > 0){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result=> {
        setWeather(result)})
        setQuery('')
        console.log(weather)
      }
    else{
        alert("OOPS! Enter the correct Location")
    }
  }
   const url = ()=>{
    return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
   }
  const dateBuilder = (d) =>{
    let months = ["January","Febraury","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <body>
    <div className="container">
        <div className="home">
            <div className="logo">
                <img src={logo} alt = "logo" height="154" width="164" className="img" />
                <br/>
                <p>Weather Forecast</p>
            </div>
            <form onSubmit={search}>
            <div class="search-items">
                <label class="search-title">Enter the Location:</label><br/>
                <input type="text" placeholder="search" class="search-bar" value = {query} onChange={e => setQuery(e.target.value)}/>
            </div>
            <div class="submit">
                <input type="submit" value="submit" class="btn" />
            </div>
            
            </form>
        </div>
        {(typeof weather.main != "undefined")?(
            <div className="content">
            <div className="location">
                <div className="location-name">
                    <p>{weather.name}</p>
                    <p>{dateBuilder(new Date())}</p>
                </div>
                <div className="icon">
                    <img src={url(weather)} alt="icon" height="154" width="164" className="icon" />
                </div>
            </div>
            <div className="report">
                <div className="temperature">
                    <p className="temp">Temperature</p>
                    <p className="temp-val">{Math.round(weather.main.temp)}°C</p>
                </div>
                <div className="climate">
                    <p className="temp">Climate</p>
                    <p className="temp-val">{weather.weather[0].main}</p>
                </div>
            </div>
        <div className="details">
                <span className="list">
                    <p className="th">Humidity:</p>
                    <p className="td">{weather.main.humidity}</p>
                </span>
                <hr/>
                <span className="list">
                    <p className="th">Pressure:</p>
                    <p className="td">{weather.main.pressure}</p>
                </span>
                <hr/>
                <span className="list">
                    <p className="th">Temp_min:</p>
                    <p className="td">{weather.main.temp_min}</p>
                </span>
                <hr/>
                <span className="list">
                    <p className="th">temp_max:</p>
                    <p className="td">{weather.main.temp_max}</p>
                </span>
                <hr/>
                <span className="list">
                    <p className="th">Description:</p>
                    <p className="td">{weather.weather[0].description}</p>
                </span>
                <hr/>
                <span className="list">
                    <p className="th">Wind Speed</p>
                    <p className="td">{weather.wind.speed}</p>
                </span>
                <hr/>
        </div>
        </div>
        ):('')}
    </div>
  </body>
  );
}

export default App;
