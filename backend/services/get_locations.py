import requests
from dotenv import load_dotenv
import os

load_dotenv()

RECREATION_API_KEY = os.getenv("RECREATION_API_KEY")

def get_recreation_locations(lat, lon, radius=50, limit=50, activity=None):
    url = "https://ridb.recreation.gov/api/v1/facilities"
    headers = {"apikey": os.getenv("RECREATION_API_KEY")}
    params = {
        "latitude": lat,
        "longitude": lon,
        "radius": radius,
        "limit": limit
    }

    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        return {"error": f"Failed to fetch facilities: {response.status_code}"}

    raw_data = response.json()
    formatted_facilities_data = transform_facilities_data(raw_data)
    print(formatted_facilities_data)
    return formatted_facilities_data
    

def transform_facilities_data(raw_data):
    transformed = []
    facilities_data = raw_data.get("RECDATA")
    
    for facility in facilities_data:
        # Ensure each facility is a dictionary
        if not isinstance(facility, dict):
            continue

        # Extract relevant details with default values
        facility_info = {
            "name": facility.get("FacilityName", "Unknown Facility"),
            "description": facility.get("FacilityDescription", "No description available."),
            "latitude": facility.get("FacilityLatitude"),
            "longitude": facility.get("FacilityLongitude"),
            "type": facility.get("FacilityTypeDescription", "Unknown Type"),
            "reservable": facility.get("Reservable", False),
            "phone": facility.get("FacilityPhone", "No phone available"),
            "email": facility.get("FacilityEmail", "No email available"),
            "address": "; ".join(
                [
                    addr.get("StreetAddress1", "")
                    for addr in facility.get("FACILITYADDRESS", [])
                    if isinstance(addr, dict) and addr.get("StreetAddress1")
                ]
            ),
            "media": None,
        }

        media_list = facility.get("MEDIA", [])
        if isinstance(media_list, list):
            primary_media = next(
                (media.get("URL") for media in media_list if isinstance(media, dict) and media.get("IsPrimary")),
                None,
            )
            facility_info["media"] = primary_media or (media_list[0]["URL"] if media_list else None)

        transformed.append(facility_info)

    return transformed