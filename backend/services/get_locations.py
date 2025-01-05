import requests
from dotenv import load_dotenv
import os

load_dotenv()

RECREATION_API_KEY = os.getenv("RECREATION_API_KEY")

def fetch_facilities(lat, lon, radius=500, limit=50):
    url = "https://ridb.recreation.gov/api/v1/facilities"
    headers = {"apikey": RECREATION_API_KEY}
    params = {
        "latitude": lat,
        "longitude": lon,
        "radius": radius,
        "limit": limit,
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        return {"error": f"Failed to fetch facilities: {response.status_code}"}

    return response.json().get("RECDATA", [])


def fetch_campsites_for_facility(facility_id):
    url = f"https://ridb.recreation.gov/api/v1/facilities/{facility_id}/campsites"
    headers = {"apikey": RECREATION_API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return []

    campsites = response.json().get("RECDATA", [])
    return campsites


def get_camping_data(lat, lon, radius=50, limit=50):
    facilities = fetch_facilities(lat, lon, radius, limit)
    camping_data = []

    for facility in facilities:
        facility_id = facility.get("FacilityID")
        if not facility_id:
            continue

        campsites = fetch_campsites_for_facility(facility_id)
        if campsites:
            camping_data.append(
                {
                    "facility_name": facility.get("FacilityName", "Unknown Facility"),
                    "description": facility.get("FacilityDescription", "No description available."),
                    "latitude": facility.get("FacilityLatitude"),
                    "longitude": facility.get("FacilityLongitude"),
                    "reservable": facility.get("Reservable", False),
                    "campsites": [
                        {
                            "name": campsite.get("CampsiteName", "Unknown Campsite"),
                            "type": campsite.get("CampsiteType", "Unknown Type"),
                            "accessible": campsite.get("CampsiteAccessible", False),
                        }
                        for campsite in campsites
                    ],
                }
            )

    return camping_data