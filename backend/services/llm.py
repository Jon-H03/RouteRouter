from openai import OpenAI
import os 
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_recommendations(weather, campsites):
    prompt = f"""
            You are an AI assistant that provides outdoor camping recommendations. Based on the following data:

            Weather:
            {weather}

            Campsites:
            {', '.join([site['facility_name'] for site in campsites])}

            Please generate a helpful and concise observation about the weather and suggest the best campsites for the user to visit. Pl
        """
    
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an outdoor activity assistant."},
                {"role": "user", "content": prompt}
            ],
            model="gpt-3.5-turbo"
        )
        
        refined_response = clean_llm_response(response.choices[0].message.content)
        return refined_response
    except Exception as e:
        return f"Error generating recommendations: {str(e)}"
    

def clean_llm_response(response):
    response = response.replace("Observation:", "").strip()
    import re
    response = re.sub(r'\d+\.\s', '', response)
    return response