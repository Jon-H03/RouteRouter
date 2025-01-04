import requests 
import os
from dotenv import load_dotenv

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
        "units": "imperial",  
        "appid": os.getenv("OPENWEATHER_API_KEY")
    }

    response = requests.get(weather_url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(response)
        return {"error": f"Failed to fetch weather data: {response.status_code}"}
    