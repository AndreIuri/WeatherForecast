const API_KEY = "95e38ba9c062f24b1f3654d9a0d542b1"
const BASE_URL="http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"

export const getOpenWeather = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${BASE_URL}`)
}

