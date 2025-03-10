# WeatherForecast
Weather Forecast React application

# Important
App isnt deployed but application is properly working in a local environment.

Weather forecast application built in React where it is possible to obtain the 5-day weather forecast for a city entered by the user.

# Vite
The application was built through Vite that allows to create projects in different frameworks including React. The command to install Vite through npm is "npm install -D vite"

# Notes
Necessary to install 'npm install' inside WeatherForecast\Weather-React\Weather-React folder to obtain node modules folder

Project contains some funcionalities like:
- a graph with the evolution of the temperature per day built using CanvasJS "https://canvasjs.com/" installed through "npm install @canvasjs/react-charts"
- a temperature map centred on the chosen city built through google maps api and openweathermap temperature layer map installed through npm install "@react-google-maps/api"

Followed Tips:
- Produced code is in React Type Script
- The OpenWeatherMap API (https://openweathermap.org) gives all the necessary data for the challenge execution. 
- forms were built using Formik through "npm install formik"
- necessry validations performed through "npm install yup"

# OpenWeather API key
const API_KEY present in src/pages/weather/Weather.tsx and src/pages/maps/MapTemperature.tsx contains the openweather api key used in the project. 

# Google Maps API key
const googleMapsKey present in src/pages/maps/MapTemperature.tsx contains the google maps api key used in the project. The obtained key does not allow to obtain the full resources necessary to renderize the temperature map because the billing informations for google account associated with the API key were not inserted.

# API Keys important note
This API keys should appear in a .env file but for a easy upload to github .env file was not uploaded an API keys were inserted directly in the application

List of commands used in the configuration of the project:
- npm create vite@latest
- npm install react-router-dom --save
- npm install formik --save
- npm install @canvasjs/react-charts
- npm i --save-dev @types/canvasjs__react-charts
- npm install @react-google-maps/api
- npm install yup
- npm i --save-dev @types/node
