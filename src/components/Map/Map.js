import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import mapStyles from "./mapStyles";

// Google-map-react guide: https://www.npmjs.com/package/google-map-react

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  // isDesktop is set to be false if min-width is larger than 600px
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={20}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(event) => {
          // console.log(event);
          // from developer tools:
          // bounds:
          // ne: {lat: 37.3122561550864, lng: -122.03394670849418}
          // nw: {lat: 37.3122561550864, lng: -122.03514029150581}
          // se: {lat: 37.31121724132446, lng: -122.03394670849418}
          // sw: {lat: 37.31121724132446, lng: -122.03514029150581}
          // [[Prototype]]: Object
          // center:
          // lat: 37.311736700000026
          // lng: -122.0345435
          // [[Prototype]]: Object
          // marginBounds:
          // ne: {lat: 37.31220282310734, lng: -122.03401376371956}
          // nw: {lat: 37.31220282310734, lng: -122.03507323628044}
          // se: {lat: 37.31127057400268, lng: -122.03401376371956}
          // sw: {lat: 37.31127057400268, lng: -122.03507323628044}
          // [[Prototype]]: Object
          // size: {width: 890, height: 974}
          // zoom: 20
          // [[Prototype]]: Object
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)} // convert string to number
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" /> //if !isDesktop, that is mobile view, show icon only, otherwise, show a paper content
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.length &&
          weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                height={100}
                alt="weather data"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
