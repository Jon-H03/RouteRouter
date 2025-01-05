import { useEffect, useState } from "react";

export const useLoadingMessages = () => {
  const messages = [
    "Fetching campsites in the area...",
    "Analyzing the weather...",
    "Generating observations & recommendations...",
    "Checking for bear sightings 🐻...",
    "Locating the best marshmallow roasting spots 🔥...",
    "Ensuring the mosquitoes are friendly 🦟...",
    "Double-checking the number of stars in the sky 🌌...",
    "Scouting for secret trails 🗺️...",
    "Finding the perfect log to sit on...",
    "Confirming the campfire stories are spooky enough 👻...",
    "Consulting local squirrels for their recommendations 🐿️...",
  ];
  const intervalMs = 1500;
  const [currentMessage, setCurrentMessage] = useState<string>(messages[0]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, intervalMs);

    return () => clearInterval(messageInterval);
  }, []);

  return currentMessage;
};
