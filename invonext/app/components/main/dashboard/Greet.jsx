"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const quotes = [
  "Every day is a new beginning.",
  "Believe you can and you're halfway there.",
  "Small steps every day lead to big results.",
  "Positivity always wins.",
  "Your hard work will pay off.",
  "Stay focused and keep growing.",
];

const Greet = ({ userName }) => {
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomQuote(quote);
  }, [setRandomQuote]);

  return (
    <div className="bg-white p-6 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {userName}!
        </h2>

        {randomQuote && (
          <p className="text-gray-500 italic text-sm sm:text-base">
            &quot;{randomQuote}&quot;
          </p>
        )}
      </div>

      <div className="hidden sm:block">
        <Image
          src="/assets/dashboard/love.png"
          alt="Motivational Emoji"
          width={60}
          height={60}
          className="animate-bounce"
        />
      </div>
    </div>
  );
};

export default Greet;
