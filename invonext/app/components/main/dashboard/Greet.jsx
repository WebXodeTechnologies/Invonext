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

const Greet = () => {
  const [randomQuote, setRandomQuote] = useState("");
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Set Random Quote
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote);

    // 2. Fetch User Data from MongoDB
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        const result = await response.json();

        if (result.success) {
          setDbUser(result.data);
          console.log("🟢 User synced from DB:", result.data.name);
        }
      } catch (error) {
        console.error("🔴 Error fetching user from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Skeleton Loader while fetching
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl mb-6 h-32 animate-pulse shadow-sm" />
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-md space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Left section: Greeting + Quote */}
      <div className="flex flex-col flex-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back, {dbUser?.name || "User"}!
        </h2>
        {randomQuote && (
          <p className="text-gray-500 italic text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
            &quot;{randomQuote}&quot;
          </p>
        )}
      </div>

      {/* Right section: Motivational Image */}
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        <Image
          src="/assets/dashboard/love.png"
          alt="Motivational Emoji"
          width={96}
          height={96}
          className="animate-bounce w-full h-full"
        />
      </div>
    </div>
  );
};

export default Greet;
