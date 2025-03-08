import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import GraphTemperature from '../graphs/GraphTemperature';
import MapTemperature from '../maps/MapTemperature';

export function Weather() {

    const API_KEY = import.meta.env.VITE_API_KEY;
    const openWeatherIcon1 = "https://openweathermap.org/img/wn/";
    const openWeatherIcon2 = "@2x.png";
    var response: any
    var data: any
    var days: any[][] = [] 
    const [weatherDays, setweatherDays] = useState<any[]>([]);
    const [cityCoords, setCityCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng:0 });
    const [graphChosenDay, setGraphChosenDay] = useState("");
    var temp_max: any[][] = [] 
    var temp_min: any[][] = [] 
    const [tempScale, setTempScale] = useState(" ºC");
    const [dates, setDates] = useState<{ id: number; date: string }[]>([
        {id:0, date: "DayWeek Month DayMonth Year"},
        {id:1, date: "DayWeek Month DayMonth Year"},
        {id:2, date: "DayWeek Month DayMonth Year"},
        {id:3, date: "DayWeek Month DayMonth Year"},
        {id:4, date: "DayWeek Month DayMonth Year"},
        {id:5, date: "DayWeek Month DayMonth Year"},
    ]);
    const [nextDays, setNextDays] = useState<{ id: number; min: string; max: string; icon: string; desc: string; temp: string ; hour: string; dayMonth: string}[]>
    ([{id:0, min:"10", max:"12", icon: openWeatherIcon1+"1d"+openWeatherIcon2, desc: "weather description", temp: "11.1", hour:"12:00", dayMonth: "01"},
      {id:1, min:"14", max:"16", icon: openWeatherIcon1+"02d"+openWeatherIcon2, desc: "weather description", temp: "15.5", hour:"12:00", dayMonth: "02"},
      {id:2, min:"14", max:"17", icon: openWeatherIcon1+"03d"+openWeatherIcon2, desc: "weather description", temp: "15.1", hour:"12:00", dayMonth: "03"},
      {id:3, min:"10", max:"13", icon: openWeatherIcon1+"04d"+openWeatherIcon2, desc: "weather description", temp: "10.7", hour:"12:00", dayMonth: "04"},
      {id:4, min:"11", max:"14", icon: openWeatherIcon1+"09d"+openWeatherIcon2, desc: "weather description", temp: "12.1", hour:"12:00", dayMonth: "05"},
      {id:5, min:"12", max:"16", icon: openWeatherIcon1+"10d"+openWeatherIcon2, desc: "weather description", temp: "13.4", hour:"12:00", dayMonth: "06"},
    ]);
    const [weatherMainInfos, setWeatherMainInfos] = 
    useState<{ id: number; main: string; date: string; city: string; description:string; feelsLike: string; degrees: string; humidity: string; visibility: string; windSpeed: string; windDirection: string}[]>
    ([{id:0, main: openWeatherIcon1+"01d"+openWeatherIcon2, date: "DayWeek Month DayMonth Year", city: "City, Country", description: "weather description", feelsLike: "18.0", degrees: "20.0", humidity: "20", visibility: "10", windSpeed:"10", windDirection: "45"}]);

    const goToHomePage = () => {
        window.location.href = "/";
    }

    const schema = yup.object().shape({
        city: yup.string().required("City is required"),
        country: yup.string().required("Country is required"),
      });      

    const setTemperatureScale = (value:string) => {
        setTempScale(value)

        const submitButton = document.getElementById("submit-location");
        if (submitButton) {
            submitButton.click();
        }
    }

    const addDate = (formatted_date: Date, i: number) => {
        setDates(prevDates => [
            ...prevDates,
            { id: i, date: formatted_date.toDateString() }
        ]);
    };

    
    const addNextDays = (i: number, minimum:string, maximum:string, icon:string, desc:string, temp:string, hour:string, dayMonth:string) => {
        setNextDays(prevNextDays => [
            ...prevNextDays,
            { id: i, min: minimum, max: maximum, icon: icon, desc: desc, temp: temp, hour: hour, dayMonth: dayMonth }
        ]);
    };

    const addWeatherDays = (i: number, element: any) => {
        setweatherDays(prevDays => [
            ...prevDays,
            {
                id: i,
                day: element.dt_txt,
                year: element.year,
                month: element.month,
                dayNum: element.dayNum,
                hour: element.hour,
                temp: element.temp,
                temp_max: element.temp_max,
                temp_min: element.temp_min,
                main: element.main,
                description: element.description
            }
        ]);
    };    

    const addWeatherMainInfos = (i: number, main: string, date: string, city: string, description:string, feelsLike: string, degrees: string, humidity: string, visibility: string, windSpeed: string, windDirection: string) => {
        setWeatherMainInfos( [
            {
                id: i,
                main: main,
                date: date,
                city: city,
                description: description,
                feelsLike: feelsLike,
                degrees: degrees,
                humidity: humidity,
                visibility: visibility,
                windSpeed: windSpeed,
                windDirection: windDirection
            }
        ]);
    };  

    const addCityCoords = (coord: { lat: number; lon: number }) => {
        setCityCoords(
            { lat: coord.lat, lng: coord.lon }
        );
    };

    const setWeatherDayGraph = (day:any, id:any) => {
        setGraphChosenDay(day);
        const elements = document.querySelectorAll('.day-' + id);

        document.querySelectorAll('.border-black').forEach(el => {
            el.classList.remove('border-black');
        });
        
        elements.forEach(el => {
            el.classList.add('border-black');
        });
        
    };

    const convertTemperature = (temperature:any) => {
    
        if (tempScale === " ºC") {
            temperature = temperature - 273.15;
        } else if (tempScale === " ºF") {
            temperature = (temperature - 273.15) * 1.8 + 32;
        } else {
            return temperature + tempScale;
        }
    
        return temperature.toFixed(1) + tempScale;
    };

    const convertVisibility = (visibility:any) => {
        visibility = visibility/1000
        return visibility.toFixed(1) + " km";
    }

    const clearArrays = () => {
        setDates([]);
        setNextDays([]);
    }

    const closeErrorMessage = () => {
        const errorElement = document.getElementById("error");
        if (errorElement) {
          errorElement.style.display = "none";  
        }
    }

    const getWeatherList = async (tempHoursList:any, current_dt:any) => {
        var day=0
        for(var i=0;i<tempHoursList.length;i++){
            if (!days[day]) {
                days[day] = [];
                temp_max[day] = [];
                temp_min[day] = [];
            }
            if(i!=0){
                if(tempHoursList[i].dt_txt.split(" ")[0] != tempHoursList[i-1].dt_txt.split(" ")[0]){
                    day+=1;
                    if (!days[day]) {
                        days[day] = [];
                        temp_max[day] = [];
                        temp_min[day] = [];
                    }
                }
            } else {
                if (tempHoursList[i]) {
                    addWeatherMainInfos(day,openWeatherIcon1+tempHoursList[i].weather[0].icon+openWeatherIcon2, current_dt, data.city.name + ", " +data.city.country,
                    tempHoursList[i].weather[0].description, convertTemperature(tempHoursList[i].main.feels_like), convertTemperature(tempHoursList[i].main.temp),
                    tempHoursList[i].main.humidity, convertVisibility(tempHoursList[i].visibility), tempHoursList[i].wind.speed, tempHoursList[i].wind.deg)
                }
            }
            temp_max[day].push(tempHoursList[i].main.temp_max)
            temp_min[day].push(tempHoursList[i].main.temp_min)
            var elements = {
                'dt_txt': tempHoursList[i].dt_txt,
                'year': tempHoursList[i].dt_txt.split(" ")[0].split("-")[0],
                'month': tempHoursList[i].dt_txt.split(" ")[0].split("-")[1],
                'dayNum': tempHoursList[i].dt_txt.split(" ")[0].split("-")[2],
                'hour': tempHoursList[i].dt_txt.split(" ")[1].split(":")[0] + ":" + tempHoursList[i].dt_txt.split(" ")[1].split(":")[1],
                'temp': convertTemperature(tempHoursList[i].main.temp).split(" ")[0],
                'temp_max': tempHoursList[i].main.temp_max,
                'temp_min': tempHoursList[i].main.temp_min,
                'icon': tempHoursList[i].weather[0].icon,
                'description': tempHoursList[i].weather[0].description
            };
            days[day].push(elements)
            if(i==0){
                addWeatherDays(i, elements);
                setWeatherDayGraph(elements.dayNum, 0)
            } else {
                addWeatherDays(i, elements);
            }
        }
    }

    const getTemperatureByDay = async (days_array:any) => {
        clearArrays()
        for(var i=0;i<days_array.length;i++){
            var h=0
            for(var y=0;y<days_array[i].length;y++){
                if(days_array[i][y]?.hour.includes("12:00")){
                    h=y
                }
            }
            var dt = days_array[i][h]?.dt_txt;
            var hour = days_array[i][h]?.hour;
            var dayNum = days_array[i][h]?.dayNum;
            var temp = days_array[i][h]?.temp;
            var description = days_array[i][h]?.description;
            var formated_date = new Date(dt.split(" ")[0])
            var icon = days_array[i][h]?.icon;
            var max =  Math.max.apply(Math, temp_max[i]).toString();
            var min =  Math.min.apply(Math, temp_min[i]).toString();

            addDate(formated_date, i)
            addNextDays(i, convertTemperature(min), convertTemperature(max), openWeatherIcon1+icon+openWeatherIcon2, description,
            temp + tempScale, hour, dayNum)

        }
    }

    const getOpenWeather = async (value:any) => {
        const errorElement = document.getElementById("error");
        const errorMessageElement = document.getElementById("error_message");
        schema
        .validate({ city: value.city, country: value.country })
        .catch((err) => {
          if (errorElement && errorMessageElement) {
            errorMessageElement.innerHTML = err.errors.join(", ");
            errorElement.style.display = "inline";  
          }
        });
        if((value.city != "" && value.city != undefined) && value.country != ""){
            var current_date = new Date();
            var current_dt = current_date.toDateString()
            var city = value.city
            var country = value.country
            response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`);
            data = await response.json();
            if(data.cod != "200"){
                if (errorElement && errorMessageElement) {
                    errorMessageElement.innerHTML = data.message;
                    errorElement.style.display = "inline";  
                }
            } else {
                setweatherDays([]);
                setCityCoords({lat:0, lng:0});
                var tempHoursList = []
                tempHoursList = data.list;
                addCityCoords(data.city.coord);
                getWeatherList(tempHoursList, current_dt)
                getTemperatureByDay(days)
            }
        }
    }


  return (
    <>
        <div className="container">
            <div className="grid-card first-grid-card">
                <div className="row row-cards vertical">
                    <div className="container-left">
                        <button type="button" title="Back" className="refresh" onClick={goToHomePage}>&larr;</button>
                        {weatherMainInfos.map((item, index) => {
                            const mainInfo = weatherMainInfos.find((m) => m.id === item.id);
                            const date = mainInfo?.date;
                            const city = mainInfo?.city;
                            const main = mainInfo?.main;
                            const feelsLike = mainInfo?.feelsLike;
                            const description = mainInfo?.description;
                            const humidity = mainInfo?.humidity;
                            const visibility = mainInfo?.visibility;
                            const windSpeed = mainInfo?.windSpeed;
                            const windDirection = mainInfo?.windDirection;
                            const degrees = mainInfo?.degrees;

                            return (
                            <div className="day-card mt-40">
                                <p className="bold left">
                                    {date}
                                </p>
                                <p className="bold left">
                                    {city}
                                </p>
                                <p>
                                    <img src={main} alt="" width="80" height="80"/>
                                    <label className="bold">{degrees}</label>
                                </p>
                                <p>Feels like: {feelsLike}</p>
                                <p>{description}</p>
                                <p>Humidity: {humidity}% Visibility: {visibility}</p>
                                <p>Wind: {windSpeed} meter/sec     {windDirection} degrees</p>
                            </div>
                            );
                        })}
                        <MapTemperature cityCoords={cityCoords}/>
                    </div>
                </div>
            </div>
            <div className="grid-card second-grid-card">
                <div className="row row-cards vertical">
                    <div id="card1" className="card1">
                        <div className="App">
                            <h1>City Weather Forecast</h1>
                            <Formik
                                initialValues={{ country: "pt" }}
                                onSubmit={(value) => {
                                    getOpenWeather(value);
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <p>
                                            <Field type="text" name="city" maxlength="80" placeholder="City" />
                                            <Field
                                                as="select"
                                                name="country"
                                                value={values.country}
                                                onChange={(e:any) => {
                                                    setFieldValue("country", e.target.value);
                                                }}
                                            >
                                                <option value="pt">Portugal</option>
                                                <option value="gb">United Kingdom</option>
                                                <option value="es">Spain</option>
                                                <option value="fr">France</option>
                                                <option value="be">Belgium</option>
                                                <option value="it">Italy</option>
                                                <option value="us">United States</option>
                                                <option value="br">Brazil</option>
                                                <option value="in">India</option>
                                                <option value="cn">China</option>
                                                <option value="au">Australia</option>
                                                <option value="za">South Africa</option>
                                            </Field>
                                        </p>
                                        <button id="submit-location" type="submit">Submit</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div id="error">
                            <p id="error_message" className="center"></p>
                            <div className="center">
                                <button type="button" title="Ok" className="btn-ok" onClick={() => closeErrorMessage()}>Ok</button>
                            </div>
                        </div>
                    </div>
                    <div id="card2" className="card2">
                        <GraphTemperature temperatures={weatherDays} chosenDay={graphChosenDay} tempScale={tempScale}  />
                    </div>
                </div>
            </div>
            <div className="grid-card container-right third-grid-card">
                <select title="Choose Temperature Scale" className="refresh select-temp"                                             
                    onChange={(e:any) => {
                        setTemperatureScale(e.target.value);
                    }}>
                    <option value=" ºC">ºC</option>
                    <option value=" ºF">ºF</option>
                    <option value=" K">K</option>
                </select>
                <h3 className="center">Five day Forecast</h3>
                {dates.map((dateItem, index) => {
                    const nextDay = nextDays.find((m) => m.id === dateItem.id);
                    const minItem = nextDay?.min
                    const maxItem = nextDay?.max
                    const dtItem = dates.find((i) => i.id === dateItem.id);
                    const iconItem = nextDay?.icon
                    const descItem = nextDay?.desc
                    const tempItem = nextDay?.temp
                    const hourItem = nextDay?.hour
                    const dayMonthItem = nextDay?.dayMonth
                    var className = "day-card five-days day-"+dateItem.id+" center";
                    if(dateItem.id==0){
                        className += " border-black"
                    }

                    return (
                        <div className={className} key={dateItem.id} onClick={() => setWeatherDayGraph(dayMonthItem, dateItem.id)}>
                            <p>{dtItem?.date}
                                <img src={iconItem} alt="" width="50" height="50"/>
                                {descItem}
                            </p>
                            <p>{tempItem}<label className="hours">for {hourItem}</label> 
                                min/max: {minItem} / {maxItem}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
    )
}