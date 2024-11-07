"use client";

import { Lato } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { metadata } from "@/components/metaData";
import { PersistGate } from "redux-persist/integration/react";

// Configure Lato font with specified weights
const lato = Lato({
  weight: ["400", "700"], // specify weights if needed
  subsets: ["latin"],
  variable: "--font-lato",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title =
    typeof metadata.title === "string" ? metadata.title : "Default Title";

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta
          name="description"
          content={metadata.description || "Default description"}
        />
      </head>
      {/* Apply the Lato font class to the body */}
      <body className={`${lato.variable} antialiased`}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>{children}</Provider>
        </PersistGate>
      </body>
    </html>
  );
}
