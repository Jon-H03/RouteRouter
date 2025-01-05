import { useEffect, useState } from "react";

export const useLoadingMessages = () => {
  const messages = [
    "Fetching campsites in the area 🏕️...",
    "Analyzing the weather ☀️...",
    "Generating observations & recommendations 📋...",
    "Checking for bear sightings 🐻...",
    "Locating the best marshmallow roasting spots 🔥...",
    "Ensuring the mosquitoes are friendly 🦟...",
    "Double-checking the number of stars in the sky 🌌...",
    "Scouting for secret trails 🗺️...",
    "Finding the perfect log to sit on 🌲...",
    "Confirming the campfire stories are spooky enough 👻...",
    "Consulting local squirrels for their recommendations 🐿️...",
    "Setting up the tent in the perfect spot 🏕️...",
    "Testing the freshness of the pine air 🌲💨...",
    "Counting how many campfires we’ve built 🔥...",
    "Interviewing local owls for nighttime safety advice 🦉...",
    "Making sure the trail mix is properly mixed 🥜🍫...",
    "Training chipmunks to carry your gear 🐾...",
    "Inspecting the area for the comfiest rocks to sit on 🪨...",
    "Practicing wolf howls for authenticity 🌕🐺...",
    "Tasting every stream to ensure it's crisp and refreshing 💧...",
    "Conducting a secret handshake with forest rangers 🤝🌲...",
    "Asking the wind for its opinion on your camping plans 🌬️..."
  ];
  
  const intervalMs = 1500;
  const [currentMessage, setCurrentMessage] = useState<string>(messages[0]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, intervalMs);

    return () => clearInterval(messageInterval);
  }, [messages, intervalMs]);

  return currentMessage;
};
