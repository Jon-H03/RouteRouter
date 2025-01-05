from flask import Flask, request, jsonify
from services.get_locations import get_camping_data
from services.get_weather import get_city_coordinates, get_weather
from services.llm import generate_recommendations
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/campsites", methods=["POST"])
def get_acticity_data():
    data = request.json
    city = data.get("city")
    radius = data.get("radius", 50)

    if not city:
        return jsonify({"error": "A city or activity was not entered.\n"}), 404
    
    try:
        # Get city coordinates
        lat, lon = get_city_coordinates(city)
        if lat is None or lon is None:
            return jsonify({"error": "Could not fetch coordinates for the given city"}), 404
        
        # Fetch recreation data
        camping_locations = get_camping_data(lat, lon, radius)
        if "error" in camping_locations:
            return jsonify({"error": "Could not fetch locations."}), 500
        
        
        # Fetch weather data
        weather = get_weather(lat, lon)
        if "error" in weather:
            return jsonify({"error": "Could not fetch weather"}), 500
        
        # Fetch llm observation
        if camping_locations:
            llm_response = generate_recommendations(weather, camping_locations)
            if "error" in llm_response:
                return jsonify({"error": "Could not fetch observations"}), 500
        else:
            llm_response = "AI Observations can not be loaded at this time as no campsites were found."
        
        
        response = {
            "city": city,
            "coordinates": {"latitude": lat, "longitude": lon},
            "locations": camping_locations,
            "weather": weather,
            "llm_response": llm_response
        }
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    

if __name__ == "__main__":
    app.run(debug=True, port=5003)

