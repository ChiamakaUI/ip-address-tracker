import React, { useState } from "react";
import "./App.css";
import { MdArrowForwardIos } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SetView from "./Components/SetView";

function App() {
  const [ip, setIp] = useState("8.8.8.8");
  const [latNLong, setLatNLong] = useState([37.38605, -122.08385]);
  const [info, setInfo] = useState({
    ip: "8.8.8.8",
    location: "Mountain View, United States of America, North America",
    timezone: ["UTC-12:00"],
    callCodes: [1],
  });
  const handleChange = (e) => {
    const newIP = e.target.value;
    setIp(newIP);
  };
  // const map = useMap()

  const getLocation = (e) => {
    e.preventDefault();
    const url = `https://api.apilayer.com/ip_to_location/${ip}`;
    const myHeaders = new Headers();
    myHeaders.append("apikey", "WuiwxW46icw6fMAca81Uxkh1yWKB09a6");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => getInfo(result))
      .catch((error) => console.log("error", error));
  };

  const getInfo = (res) => {
    const {
      ip,
      latitude,
      longitude,
      continent_name,
      country_name,
      city,
      location: { calling_codes },
      timezones,
    } = res;

    setInfo((prev) => ({
      ...prev,
      ip: ip,
      location: `${city}, ${country_name}, ${continent_name}`,
      timezone: timezones,
      callCodes: calling_codes,
    }));
    const newLatNLong = [latitude, longitude];
    setLatNLong(newLatNLong);
  };
  const style = { color: "white", fontSize: "1.2em" };
  return (
    <div className="container">
      <div className="form-div">
        <h3>IP Address Tracker</h3>
      <form>
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          onChange={handleChange}
        />
        <button onClick={getLocation}>
          <MdArrowForwardIos style={style}/>
        </button>
      </form>
      </div>
      
      <div className="info-div">
        <div>
          <h3>IP ADDRESS</h3>
          <p>{info.ip}</p>
        </div>
        <div>
          <h3>LOCATION</h3>
          <p>{info.location}</p>
        </div>
        <div>
          <h3>TIMEZONE</h3>
          <p>{info.timezone[0]}</p>
        </div>
        <div>
          <h3>CALLCODES</h3>
          <p>{info.callCodes[0]}</p>
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={latNLong}
          zoom={13}
          scrollWheelZoom={true}
        >
          <SetView coords={latNLong} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           <Marker position={latNLong}>
            <Popup>
            {info.location}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
