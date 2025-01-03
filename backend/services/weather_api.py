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
    response = requests.get(geocoding_url, params=params)
    if response.status_code == 200:
        data = response.json()
        print(data)
        if data:
            return data[0]["lat"], data[0]["lon"]
        else:
            return None, None
    return None, None
