import requests 
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()


def get_city_coordinates(city_name):
    geocoding_url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q": city_name,
        "limit": 1,
        "appid": os.getenv("OPENWEATHER_API_KEY")
    }
    try:
        response = requests.get(geocoding_url, params=params)
        if response.status_code == 200:
            data = response.json()
            if data:
                return data[0]["lat"], data[0]["lon"]
    except requests.RequestException as e:
        return {"error": f"Failed to fetch lat and long data: {response.status_code}"}
    

def get_weather(lat, lon):
    weather_url = "https://api.openweathermap.org/data/3.0/onecall"
    params = {
        "lat": lat,
        "lon": lon,
        "exclude": "minutely,hourly",
        "units": "imperial",  
        "appid": os.getenv("OPENWEATHER_API_KEY")
    }

    response = requests.get(weather_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if "daily" in data:
            data["daily"] = transform_daily_forecast(data["daily"])
        return data
    else:
        print(response)
        return {"error": f"Failed to fetch weather data: {response.status_code}"}
    

def transform_daily_forecast(daily_data):
    transformed_forecast = []

    for day in daily_data:
        transformed_forecast.append({
            "date": datetime.utcfromtimestamp(day["dt"]).strftime('%Y-%m-%d'),
            "summary": day.get("summary", "No summary available"),
            "temperature": {
                "min": day["temp"]["min"],
                "max": day["temp"]["max"],
                "day": day["temp"]["day"],
                "night": day["temp"]["night"]
            },
            "feels_like": {
                "day": day["feels_like"]["day"],
                "night": day["feels_like"]["night"]
            },
            "humidity": day["humidity"],
            "wind": {
                "speed": day["wind_speed"],
                "gust": day.get("wind_gust", "N/A"),
                "direction": day["wind_deg"]
            },
            "uvi": day["uvi"],
            "conditions": {
                "main": day["weather"][0]["main"],
                "description": day["weather"][0]["description"],
                "icon": day["weather"][0]["icon"]
            },
            "rain": day.get("rain", 0),
            "cloud_coverage": day["clouds"]
        })

    return transformed_forecast
