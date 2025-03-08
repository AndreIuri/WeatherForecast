<<<<<<< HEAD
# WeatherForecast
Weather Forecast React application

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
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
>>>>>>> 706c8f6 (deploy app)
