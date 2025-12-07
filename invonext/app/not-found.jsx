import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-center px-4">
      
      <h1 className="text-7xl font-bold text-gray-900 dark:text-white">
        404
      </h1>

      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        aria-label="Go back to homepage"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
