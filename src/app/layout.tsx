'use client' // 👈 Ensures this component runs only on the client

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from 'react-redux';
import store from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [persistor, setPersistor] = useState<any>(null);

  // useEffect(() => {
  //   setPersistor(persistStore(store)); // ✅ Ensures persistor is initialized only on the client
  // }, []);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {persistor ? ( 
            <PersistGate loading={null} persistor={persistor}>
              <Header />
              {children}
              <Footer />
            </PersistGate>
          ) : (
            <> {/* Prevent UI from breaking if persistor is not ready */}
              <Header />
              {children}
              <Footer />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}
