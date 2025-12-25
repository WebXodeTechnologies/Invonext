"use client";

import Image from "next/image";
import React, { useMemo } from "react";

const Greet = ({ userName }) => {
  const quotes = useMemo(
    () => [
      "Every day is a new beginning.",
      "Believe you can and you're halfway there.",
      "Small steps every day lead to big results.",
      "Positivity always wins.",
      "Your hard work will pay off.",
      "Stay focused and keep growing.",
    ],
    []
  );

  const randomQuote = useMemo(
    // eslint-disable-next-line react-hooks/purity
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [quotes]
  );

  return (
    <div className="bg-white p-6 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-md">
      {/* Text Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {userName}!
        </h2>
        <p className="text-gray-500 italic text-sm sm:text-base">
          &quot;{randomQuote}&quot;
        </p>
      </div>

      {/* Emoji / Illustration */}
      <div className="hidden sm:block">
        <Image
          src="/assets/dashboard/love.png" // <-- Use public path
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
