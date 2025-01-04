import requests
from dotenv import load_dotenv
import os

load_dotenv()

RECREATION_API_KEY = os.getenv("RECREATION_API_KEY")

def get_recreation_locations(lat, lon, activity):
    url = f"https://ridb.recreation.gov/api/v1/facilities"
    headers = {"apikey": os.getenv("RECREATION_API_KEY")}
    params = {
        "latitude": lat,
        "longitude": lon,
        "activity": activity,
        "radius": 150,
        "limit": 50
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data: {response.status_code}"}