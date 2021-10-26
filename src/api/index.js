import axios from "axios";

// use Travel Advisor API from Rapit API website
// https://rapidapi.com/apidojo/api/travel-advisor/
export const getPlacesData = async (type, sw, ne) => {
  try {
    // const response = await axios.get(URL, options)
    // return response

    // deconstruct response.data: {data}, since the json response data body consists of data,
    // deconstruct data again to get the places data

    // const {data:{data}} = await axios.get(URL, options)
    // return data
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat, // Latitude of bottom left coordinate
          bl_longitude: sw.lng, // Longitude of bottom left coordinate
          tr_longitude: ne.lng, // Longitude of top right coordinate
          tr_latitude: ne.lat, // Latitude of top right coordinate
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// https://rapidapi.com/community/api/open-weather-map/
// GET search weather data
export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lon: lng,
          lat: lat,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
