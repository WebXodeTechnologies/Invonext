import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "InvoNext — Modern GST Invoicing & Financial Intelligence Platform",
  description:
    "A minimal, high-velocity invoice generator engineered for Indian SMEs, developers, and global agencies. Create compliant CGST/SGST/IGST tax invoices, track sprint tasks with Kanban, and export audit-ready financial ledgers.",
  keywords: [
    "InvoNext",
    "invoice generator",
    "GST billing software india",
    "intrastate gst invoice",
    "interstate igst billing",
    "export invoice LUT",
    "Kanban task manager",
    "Next.js invoice app",
    "client directory",
    "audit GSTR-1 export",
  ],
  metadataBase: new URL("https://invo-next.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "InvoNext — Work. Simplified.",
    description:
      "Minimal, lightning-fast GST invoice generator, Kanban task pipeline, and client financial manager.",
    url: "https://invo-next.com",
    siteName: "InvoNext",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoNext Platform Interface Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoNext — Work. Simplified.",
    description:
      "Modern GST invoice generator with multi-theme PDF exports, client directory, and integrated sprint board.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#4f46e5",
          colorText: "#0f172a",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-inter), sans-serif",
        },
        elements: {
          card: "shadow-2xl border border-slate-200/80 rounded-3xl backdrop-blur-md",
          formButtonPrimary:
            "bg-indigo-600 hover:bg-indigo-700 text-xs font-bold transition-all shadow-md shadow-indigo-100",
        },
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} ${jakarta.variable} scroll-smooth`}
        suppressHydrationWarning
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "InvoNext",
                operatingSystem: "Web",
                applicationCategory: "BusinessApplication",
                url: "https://invo-next.com",
                description:
                  "Comprehensive billing software for Indian SMEs featuring automated CGST/SGST/IGST tax splits, custom signature injection, and Kanban task pipelines.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "INR",
                },
                creator: {
                  "@type": "Organization",
                  name: "InvoNext Inc.",
                },
              }),
            }}
          />
        </head>

        <body className="font-sans antialiased bg-[#fafafa] text-slate-900 selection:bg-indigo-500 selection:text-white min-h-screen">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                padding: "12px 16px",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: "600",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              },
              success: {
                iconTheme: {
                  primary: "#4f46e5",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#e11d48",
                  secondary: "#ffffff",
                },
              },
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
