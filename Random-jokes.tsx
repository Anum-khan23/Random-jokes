"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface JokeResponse {
  setup: string;
  punchline: string;
}

const JokeComponent = () => {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg transform transition-all hover:scale-105 duration-300 ease-out">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800 tracking-wide">
          😆 New Joke 😆
        </h1>
        <div className="bg-gray-100 rounded-xl p-6 mb-8 text-gray-700 text-lg text-center shadow-inner">
          {joke || "Loading..."}
        </div>
        <Button
          onClick={fetchJoke}
          className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-out hover:scale-110 focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50"
        >
          😂 Get New Joke 😂
        </Button>
      </div>
    </div>
  );
};

export default JokeComponent;


