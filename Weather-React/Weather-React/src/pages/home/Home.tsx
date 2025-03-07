export function Home() {

    const goToWeatherPage = () => {
        window.location.href = "/weather";
    }

  return (
    <>
        <div className="container">
            <div className="card paper">
                <div className="row home-card">
                    <h1 className="center">Weather Forecast</h1>
                    <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="Weather summer season" width="100" height="100"/>
                </div>
                <div className="center">
                    <p>Real time weather forecast</p>
                    <p>Access in real time weather forecast for a given location and forecasts for the next five days.</p>
                    <button type="button" title="Begin" onClick={goToWeatherPage}>Begin</button>
                </div>
            </div>
        </div>
    </>
  )
}