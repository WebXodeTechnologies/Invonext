import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "InvoNext — Work. Simplified.",
  description:
    "A modern invoice generator built for Indian businesses. Create GST & non-GST invoices, manage clients, track revenue, and streamline your workflow effortlessly.",
  keywords: [
    "invoice generator",
    "GST billing software",
    "Indian invoicing tool",
    "Next.js invoice app",
    "client management",
    "billing software india",
    "InvoNext",
    "invoice PDF",
  ],
  metadataBase: new URL("https://invo-next.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "InvoNext — Work. Simplified.",
    description:
      "Minimal, fast and powerful invoice generator for Indian businesses.",
    url: "https://invo-next.com",
    siteName: "InvoNext",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoNext Invoice System",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "InvoNext — Work. Simplified.",
    description:
      "A powerful, minimal invoice generator with GST support and custom PDF templates.",
    images: ["/og-image.png"],
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* JSON-LD STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "InvoNext",
              operatingSystem: "Web",
              applicationCategory: "BusinessApplication",
              description:
                "A modern invoice generator for Indian businesses with GST support, revenue tracking and client management.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${inter.variable} antialiased bg-white dark:bg-[#000000] text-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
