"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { metadata } from "@/components/metaData";
import { PersistGate } from "redux-persist/integration/react";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
      <body className={` antialiased`}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>{children}</Provider>
        </PersistGate>
      </body>
    </html>
  );
}
